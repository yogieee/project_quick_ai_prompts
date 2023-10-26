import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left ">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-mid">
        {type} and share creative AI prompts with the world, and let your prompt
        run wild with any AI-powered platforms
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            name="yourprompt"
            value={post.prompt}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, prompt: e.target.value }))
            }
            required
            placeholder="Write your AI prompt here..."
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="text-sm  text-base text-gray-500">
              (#webdev, #idea, #AI, #art ...)
            </span>
          </span>
          <input
            name="tag"
            value={post.tag}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, tag: e.target.value }))
            }
            required
            placeholder="#tag"
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 bg-blue-500 rounded-full text-white text-sm hover:bg-blue-700"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
