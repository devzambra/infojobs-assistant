import { component$, Slot } from "@builder.io/qwik";
import { Footer } from "~/components/layout/footer/footer";
import { Header } from "~/components/layout/header/header";

export default component$(() => {
  return (
    <div class="flex flex-col h-screen">
      <Header />
      <main class="flex-1">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
