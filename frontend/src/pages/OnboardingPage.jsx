import { useState } from "react";
import useAuthUser from "../hooks/useAuth";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting onboarding data:", formState);
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="dark"
    >
      <div className="border w-full max-w-2xl mx-auto bg-stone-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-8 flex flex-col">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Complete Your Profile
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* PROFILE PIC CONTAINER */}
                  <div className="flex flex-col items-center justify-center space-y-3">
                    {/* IMAGE PREVIEW */}
                    <div className="size-24 rounded-full bg-base-300 overflow-hidden">
                      {formState.profilePic ? (
                        <img
                          src={formState.profilePic}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Camera className="size-10 text-base-content opacity-40" />
                        </div>
                      )}
                    </div>

                    {/* Generate Random Avatar BTN */}
                    <button
                      type="button"
                      onClick={handleRandomAvatar}
                      className="btn btn-accent"
                    >
                      <ShuffleIcon className="size-4 mr-2" />
                      Random Avatar
                    </button>
                  </div>

                  {/* FULL NAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-white">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formState.fullname}
                      onChange={(e) =>
                        setFormState({ ...formState, fullname: e.target.value })
                      }
                      className="input input-bordered w-full"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* BIO */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-white">Bio</span>
                    </label>
                    <textarea
                      name="bio"
                      value={formState.bio}
                      onChange={(e) =>
                        setFormState({ ...formState, bio: e.target.value })
                      }
                      className="textarea textarea-bordered h-20 w-full"
                      placeholder="Tell others about yourself"
                    />
                  </div>

                  {/* LANGUAGES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* NATIVE LANGUAGE */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-white">
                          Native Language
                        </span>
                      </label>
                      <select
                        name="nativeLanguage"
                        value={formState.nativeLanguage}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            nativeLanguage: e.target.value,
                          })
                        }
                        className="select select-bordered w-full"
                      >
                        <option value="">Select your native language</option>
                        {LANGUAGES.map((lang) => (
                          <option
                            key={`native-${lang}`}
                            value={lang.toLowerCase()}
                          >
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* LEARNING LANGUAGE */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-white">
                          Learning Language
                        </span>
                      </label>
                      <select
                        name="learningLanguage"
                        value={formState.learningLanguage}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            learningLanguage: e.target.value,
                          })
                        }
                        className="select select-bordered w-full"
                      >
                        <option value="">
                          Select language you're learning
                        </option>
                        {LANGUAGES.map((lang) => (
                          <option
                            key={`learning-${lang}`}
                            value={lang.toLowerCase()}
                          >
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-white">Location</span>
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                      <input
                        type="text"
                        name="location"
                        value={formState.location}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            location: e.target.value,
                          })
                        }
                        className="input input-bordered w-full pl-10"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  className="btn w-full bg-green-500"
                  disabled={isPending}
                  type="submit"
                >
                  {!isPending ? (
                    <>
                      <ShipWheelIcon className="size-5 mr-2" />
                      Complete Onboarding
                    </>
                  ) : (
                    <>
                      <LoaderIcon className="animate-spin size-5 mr-2" />
                      Onboarding...
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;
