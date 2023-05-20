import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Logo } from "~/components/icons/logo";

export const Header = component$(() => {
  return (
    <header class="bg-white shadow-md shadow-gray-200 flex justify-between items-center p-4">
      <div class="w-12">
        <Logo />
      </div>
      <div class="">
        <Form>
          <input
            type="text"
            name="serach"
            placeholder="Busca tu oferta ideal"
            class="border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </Form>
      </div>
    </header>
  );
});
