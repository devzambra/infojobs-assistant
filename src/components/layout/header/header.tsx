import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Logo } from "~/components/icons/logo";

export const Header = component$(() => {
  return (
    <header class="bg-white shadow-md shadow-gray-200 w-full">
      <div class="flex justify-between items-center p-4 max-w-screen-xl m-auto">
        <div class="w-12">
          <Logo />
        </div>
        <Link
          href="/assistant/"
          class="flex gap-4 justify-between items-center rounded-md p-3 bg-blue-500 hover:bg-blue-600 shadow-md shadow-blue-300 hover:shadow-bue-100 focus:animate-[pulse_0.2s_ease-in-out] text-white font-thin"
        >
          Comenzar...
        </Link>
      </div>
    </header>
  );
});
