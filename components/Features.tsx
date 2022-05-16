export default function Features() {
  return (
    <div className="sm:flex flex-wrap justify-center items-center bg-indigo-900 pb-10 text-center gap-8">
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-indigo-500 mt-6  shadow-lg rounded-lg dark:bg-gray-800">
        <div className="flex-shrink-0">
          <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 1000 1000"
              fill="none"
            >
              <path
                d="M489.5 226.499C328 231.632 280 346.999 269 409.499C283.333 386.332 328.5 335.5 395 335.5C472.5 335.5 531.5 422 567.5 449C611.237 481.803 699.123 525.115 814.5 490C906.5 462 949.167 364.332 958.5 317.999C914 378.499 846.5 414.838 763 371.999C705.5 342.499 662.5 221 489.5 226.499Z"
                fill="#07B6D5"
              />
              <path
                d="M261 500.999C99.5 506.132 51.5 621.499 40.5 683.999C54.8333 660.832 100 610 166.5 610C244 610 303 696.5 339 723.5C382.737 756.303 470.623 799.615 586 764.5C678 736.5 720.667 638.832 730 592.499C685.5 652.999 618 689.338 534.5 646.499C477 616.999 434 495.5 261 500.999Z"
                fill="#07B6D5"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl sm:text-xl text-white font-semibold dark:text-white py-4">
          Powered by Tailwind
        </h3>
        <p className="text-md  text-white dark:text-gray-300 py-4">
          Tailwind powers all the beautiful UI you see in the web app,
          enrinching user&apos;s experience on both desktop and mobile view
        </p>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-indigo-500 shadow-lg rounded-lg dark:bg-gray-800">
        <div className="flex-shrink-0">
          <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 21H4C2.89543 21 2 20.1046 2 19V9C2 7.89543 2.89543 7 4 7H5V5C5 3.89543 5.89543 3 7 3H20C21.1046 3 22 3.89543 22 5V16C22 17.1046 21.1046 18 20 18H12V19C12 20.1046 11.1046 21 10 21ZM4 9V19H10V9H4ZM7 7H10C11.1046 7 12 7.89543 12 9V16H20V5H7V7Z"
                fill="#2E3A59"
              ></path>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl sm:text-xl text-white font-semibold dark:text-white py-4">
          Responsive Web App
        </h3>
        <p className="text-md text-white dark:text-gray-300 py-4">
          The web app is made with NextJs, which allows the multiple page web
          app to behave like a single page web app, ensuring that user&apos;s
          experience feels like they are in native application
        </p>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 py-4 bg-indigo-500 shadow-lg rounded-lg dark:bg-gray-800">
        <div className="flex-shrink-0">
          <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M18.9999 20H5.99992C2.87429 20.0018 0.270809 17.6038 0.0162787 14.4886C-0.238251 11.3733 1.94144 8.58452 5.02592 8.07898C6.44563 5.56187 9.11003 4.0035 11.9999 3.99993C13.8016 3.99334 15.5516 4.6015 16.9609 5.72398C18.3448 6.82158 19.3288 8.34432 19.7609 10.057C22.3477 10.4509 24.1932 12.7726 23.9936 15.3816C23.7939 17.9905 21.6165 20.0043 18.9999 20ZM11.9999 5.99997C9.83163 6.00254 7.83259 7.17208 6.76792 9.06098L6.29992 9.89998L5.35091 10.055C3.3012 10.3984 1.85592 12.2543 2.02513 14.3257C2.19433 16.397 3.92164 17.9938 5.99992 18H18.9999C20.5685 18.0016 21.8735 16.7946 21.9941 15.2307C22.1147 13.6667 21.0102 12.2739 19.4599 12.035L18.1439 11.835L17.8219 10.543C17.1572 7.86979 14.7545 5.99494 11.9999 5.99997Z"
                  fill="#2E3A59"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl sm:text-xl text-white font-semibold dark:text-white py-4">
          Open Source
        </h3>
        <p className="text-md  text-white dark:text-gray-300 py-4">
          The prototype of this web app is available for viewing on my Github,{" "}
          <a
            className="text-yellow-500 hover:text-yellow-600"
            href="https://github.com/Sakurai-Kei/chat-app-with-nextjs"
          >
            @sakurai-kei/chat-app-with-nextjs
          </a>
        </p>
      </div>
    </div>
  );
}
