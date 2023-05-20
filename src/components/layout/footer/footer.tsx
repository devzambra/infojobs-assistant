import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <footer class="p-4 flex justify-center border border-gray-300">
      <p>Made by @devzambra on {new Date().getFullYear()}</p>
    </footer>
  );
});
