import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createCrisisPost } from "../services/crisisService";
import { 
  FaCheckCircle, 
  FaInfoCircle, 
  FaImage, 
  FaClipboardList,
  FaArrowRight,
  FaArrowLeft
} from "react-icons/fa";

export default function CreateCrisis() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    post_type: "individual",
    location: "",
    banner_image: null,
    sections: []
  });

  const steps = [
    { number: 1, title: "Basic Info", icon: FaInfoCircle },
    { number: 2, title: "Crisis Image", icon: FaImage },
    { number: 3, title: "Additional Sections", icon: FaClipboardList },
    { number: 4, title: "Review & Submit", icon: FaCheckCircle }
  ];

  const sectionTypes = [
    { value: "shelter", label: "Shelter Information", icon: "🏠" },
    { value: "resources", label: "Resources/Goods Needed", icon: "📦" },
    { value: "fund", label: "Fund Collection Details", icon: "💰" },
    { value: "hotline", label: "Hotline Numbers", icon: "📞" },
    { value: "distribution", label: "Distribution Plans", icon: "🚚" },
    { value: "updates", label: "Initial Updates", icon: "📋" }
  ];

  // Check authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-8">
              You need to be logged in to report a crisis.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Login to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setFormData({ ...formData, banner_image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSectionChange = (index, value) => {
    const newSections = [...formData.sections];
    newSections[index].content = value;
    setFormData({ ...formData, sections: newSections });
  };

  const addSection = (type) => {
    const newSection = {
      section_type: type,
      content: ""
    };
    setFormData({ ...formData, sections: [...formData.sections, newSection] });
  };

  const removeSection = (index) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
        setError("Please fill in all required fields");
        return;
      }
      if (formData.title.length < 10) {
        setError("Title must be at least 10 characters");
        return;
      }
      if (formData.description.length < 50) {
        setError("Description must be at least 50 characters");
        return;
      }
    }

    setError("");
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("post_type", formData.post_type);
      submitData.append("location", formData.location);
      
      if (formData.banner_image) {
        submitData.append("banner_image", formData.banner_image);
      }

      // Add sections as JSON string
      if (formData.sections.length > 0) {
        submitData.append("sections", JSON.stringify(formData.sections));
      }

      await createCrisisPost(submitData);
      
      // Success - redirect to dashboard with tab parameter
      navigate("/dashboard?tab=posts");
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.response?.data?.detail || "Failed to create crisis post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getSectionIcon = (type) => {
    const section = sectionTypes.find(s => s.value === type);
    return section?.icon || "📄";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Report a Crisis
          </h1>
          <p className="text-lg text-gray-600">
            Help us coordinate relief efforts by providing detailed information
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <FaCheckCircle />
                    ) : (
                      <step.icon />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-semibold ${
                        currentStep >= step.number ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                      currentStep > step.number ? "bg-red-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Basic Crisis Information
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Crisis Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Flood Relief in Kurigram District"
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 10 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Crisis Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["national", "district", "individual"].map((type) => (
                      <label
                        key={type}
                        className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${
                          formData.post_type === type
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 hover:border-red-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="post_type"
                          value={type}
                          checked={formData.post_type === type}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="font-semibold text-gray-900 capitalize">
                          {type}-Level
                        </span>
                        {formData.post_type === type && (
                          <FaCheckCircle className="absolute top-2 right-2 text-red-600" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Kurigram District, Rangpur Division"
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide a detailed description of the crisis situation, affected areas, immediate needs, etc."
                    required
                    rows={6}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 50 characters ({formData.description.length}/50)
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Image Upload */}
            {currentStep === 2 && (
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Crisis Banner Image
                </h2>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({ ...formData, banner_image: null });
                        }}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <FaImage className="text-6xl text-gray-400 mx-auto mb-4" />
                      <label className="cursor-pointer">
                        <span className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition inline-block font-semibold">
                          Choose Image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-4">
                        PNG, JPG, JPEG up to 5MB (Optional)
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> A clear, high-quality image helps attract more support for your cause.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Additional Sections */}
            {currentStep === 3 && (
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Additional Information Sections
                </h2>

                {/* Available Sections */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Add Sections (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {sectionTypes.map((section) => (
                      <button
                        key={section.value}
                        type="button"
                        onClick={() => addSection(section.value)}
                        disabled={formData.sections.some(s => s.section_type === section.value)}
                        className="flex items-center gap-2 p-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-2xl">{section.icon}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {section.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Added Sections */}
                {formData.sections.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Added Sections:</h3>
                    {formData.sections.map((section, index) => (
                      <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getSectionIcon(section.section_type)}</span>
                            <span className="font-semibold text-gray-900 capitalize">
                              {section.section_type.replace("_", " ")}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <textarea
                          value={section.content}
                          onChange={(e) => handleSectionChange(index, e.target.value)}
                          placeholder={`Enter ${section.section_type} details...`}
                          rows={4}
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {formData.sections.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No sections added yet. Click buttons above to add sections.
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Review Your Submission
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Crisis Title</h3>
                    <p className="text-gray-700">{formData.title}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Type & Location</h3>
                    <p className="text-gray-700">
                      <span className="font-medium capitalize">{formData.post_type}-Level</span> • {formData.location}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{formData.description}</p>
                  </div>

                  {imagePreview && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Banner Image</h3>
                      <img src={imagePreview} alt="Banner" className="rounded-lg max-h-48" />
                    </div>
                  )}

                  {formData.sections.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Additional Sections ({formData.sections.length})</h3>
                      <div className="space-y-2">
                        {formData.sections.map((section, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-700">
                            <span>{getSectionIcon(section.section_type)}</span>
                            <span className="capitalize">{section.section_type.replace("_", " ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important:</strong> Your crisis post will be reviewed by our admin team before going live. You'll be notified once it's approved.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="bg-gray-50 px-8 py-6 flex justify-between border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-semibold disabled:opacity-50"
                >
                  <FaArrowLeft />
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition font-semibold shadow-lg"
                >
                  Next
                  <FaArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Crisis Report"}
                  <FaCheckCircle />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}