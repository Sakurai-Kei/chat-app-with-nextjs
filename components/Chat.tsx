export default function Chat() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center flex-shrink-0 h-16 bg-white border-b border-gray-300 px-4">
        <div>
          <h1 className="text-sm font-bold leading-none">#council-of-elrond</h1>
          <span className="text-xs leading-none">
            Let&apos;s sort this ring thing out hey!?!
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-auto">
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Sam</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">Anyone know if Frodo is awake yet?</p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-2">
          <hr className="w-full" />
          <span className="flex items-center justify-center -mt-3 bg-white h-6 px-3 rounded-full border text-xs font-semibold mx-auto">
            Today
          </span>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Elrond</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">
              Strangers from distant lands, friends of old. You have been
              summoned here to answer the threat of Mordor. Middle-Earth stands
              upon the brink of destruction. None can escape it. You will unite
              or you will fall. Each race is bound to this fate–this one doom.
              (gestures to the pedestal) Bring forth the Ring, Frodo.
            </p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Boromir</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">So it is true…</p>
            <p className="text-sm">
              It is a gift. A gift to the foes of Mordor. Why not use this Ring?
              (paces) Long has my father, the Steward of Gondor, kept the forces
              of Mordor at bay. By the blood of our people are your lands kept
              safe! Give Gondor the weapon of the Enemy. Let us use it against
              him!
            </p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Aragorn</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">
              You cannot wield it! None of us can. The One Ring answers to
              Sauron alone. It has no other master.
            </p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Boromir</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">
              And what would a ranger know of this matter?
            </p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Legolas</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">
              This is no mere ranger. He is Aragorn, son of Arathorn. You owe
              him your allegiance.
            </p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Boromim</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">Aragorn? This… is Isildur&apos;s heir?</p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Boromir</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">Gondor has no king. Gondor needs no king.</p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Gandalf</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">Aragorn is right. We cannot use it.</p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Elrond</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">
              You have only one choice. The Ring must be destroyed.
            </p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Gimli</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">What are we waiting for?</p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Elrond</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">
              The Ring cannot be destroyed, Gimli, son of Gloin by any craft
              that we here possess. The Ring was made in the fires of Mount
              Doom. Only there can it be unmade. It must be taken deep into
              Mordor and cast back into the fiery chasm from whence it came.
            </p>
            <p className="text-sm">One of you must do this.</p>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2">
            <div className="-mt-1">
              <span className="text-sm font-semibold">Boromir</span>
              <span className="ml-1 text-xs text-gray-500">01:26</span>
            </div>
            <p className="text-sm">
              One does not simply walk into Mordor. Its black gates are guarded
              by more than just orcs. There is evil there that does not sleep.
              And the great Eye is ever watchful. It is a barren wasteland
              riddled with fire and ash and dust. The very air you breathe is a
              poisonous fume. Not with ten thousand men could you do this. It is
              folly!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="flex items-center border-2 border-gray-300 rounded-sm p-1">
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </button>
          <textarea
            className="flex-grow text-sm px-3 border-l border-gray-300 ml-1"
            placeholder="Message council-of-elrond"
          ></textarea>
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
            <span className="leading-none w-4 h-4 -mt-px">@</span>
          </button>
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
            <svg
              className="h-4 w-4 transform rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
