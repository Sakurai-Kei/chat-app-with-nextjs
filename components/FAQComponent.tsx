import { useState } from "react";
import { SyntheticEvent } from "react";

export default function FAQComponent() {
  const [showModal, setShowModal] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
    faq5: false,
  });

  function modalState(currentValue: boolean) {
    if (!currentValue) {
      return true;
    } else {
      return false;
    }
  }

  function modalButton(event: SyntheticEvent<HTMLButtonElement>) {
    const currentKey = Object.keys(showModal).filter(
      (key) => key === event.currentTarget.name
    );
    //@ts-expect-error
    const currentValue: boolean = showModal[currentKey];
    setShowModal({
      ...showModal,
      [event.currentTarget.name]: modalState(currentValue),
    });
  }
  return (
    <section className="bg-slate-900">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        <h1 className="text-4xl font-semibold text-center text-white">
          Frequently asked questions
        </h1>

        <div className="mt-12 space-y-8">
          <div className="border-2 rounded-lg border-gray-100">
            <button
              onClick={modalButton}
              name="faq1"
              className="flex items-center justify-between w-full p-8"
            >
              <h1 className="font-semibold text-white">
                What is this web app?
              </h1>

              {!showModal.faq1 && (
                <>
                  <span className="text-white bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                </>
              )}
              {showModal.faq1 && (
                <>
                  <span className="text-gray-400 bg-gray-200 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    </svg>
                  </span>
                </>
              )}
            </button>

            {showModal.faq1 && (
              <>
                <hr className="border-gray-700" />
                <p className="p-8 text-sm text-gray-300">
                  This is a chatting web app. Imagine something like WhatsApp,
                  Telegram or Discord.
                </p>
              </>
            )}
          </div>

          <div className="border-2 rounded-lg border-gray-100">
            <button
              onClick={modalButton}
              name="faq2"
              className="flex items-center justify-between w-full p-8"
            >
              <h1 className="font-semibold text-white">Is this free to use?</h1>

              {!showModal.faq2 && (
                <>
                  <span className="text-white bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                </>
              )}
              {showModal.faq2 && (
                <>
                  <span className="text-gray-400 bg-gray-200 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    </svg>
                  </span>
                </>
              )}
            </button>

            {showModal.faq2 && (
              <>
                <hr className="border-gray-700" />
                <p className="p-8 text-sm text-gray-300">
                  Of course! This is simply a prototype to showcase my
                  capability and it is not meant to be a full-fledged final
                  product. Feel free to try it out
                </p>
              </>
            )}
          </div>

          <div className="border-2 rounded-lg border-gray-100">
            <button
              onClick={modalButton}
              name="faq3"
              className="flex items-center justify-between w-full p-8"
            >
              <h1 className="font-semibold text-white">
                Can I register without email?
              </h1>

              {!showModal.faq3 && (
                <>
                  <span className="text-white bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                </>
              )}
              {showModal.faq3 && (
                <>
                  <span className="text-gray-400 bg-gray-200 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    </svg>
                  </span>
                </>
              )}
            </button>

            {showModal.faq3 && (
              <>
                <hr className="border-gray-700" />
                <p className="p-8 text-sm text-gray-300">
                  You can. As this is simply a prototype, it does not verify
                  email that user uses. You can simply enter any email if you do
                  not wish to register using your real email. Naturally, this
                  means that if you forgot your password on this prototype app,
                  you cannot recover your account.
                </p>
              </>
            )}
          </div>

          <div className="border-2 rounded-lg border-gray-100">
            <button
              onClick={modalButton}
              name="faq4"
              className="flex items-center justify-between w-full p-8"
            >
              <h1 className="font-semibold text-white">
                What kind of data is kept in the database?
              </h1>

              {!showModal.faq4 && (
                <>
                  <span className="text-white bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                </>
              )}
              {showModal.faq4 && (
                <>
                  <span className="text-gray-400 bg-gray-200 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    </svg>
                  </span>
                </>
              )}
            </button>

            {showModal.faq4 && (
              <>
                <hr className="border-gray-700" />
                <p className="p-8 text-sm text-gray-300">
                  All data you input during registration is kept in the
                  database. Furthermore, password is hashed.
                  <br /> All message are stored unencrypted so anyone with
                  access to database can view the message content. Please be
                  careful of sensitive information in message content
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
