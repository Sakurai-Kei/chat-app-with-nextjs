import Link from "next/link";

export default function AppHome() {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-slate-300">
      <div>Welcome to the web app! Open the side bar to access features</div>
      <div>
        Return to{" "}
        <Link href={"/"}>
          <a className="text-indigo-500">Home</a>
        </Link>
      </div>
    </div>
  );
}
