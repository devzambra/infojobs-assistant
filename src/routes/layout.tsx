import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { Footer } from "~/components/layout/footer/footer";
import { Header } from "~/components/layout/header/header";
import { AssistantContext, initialState } from "~/state/assistant.state";

export default component$(() => {
  const assistantState = useStore(initialState);
  useContextProvider(AssistantContext, assistantState);

  return (
    <div class="flex flex-col h-screen items-center">
      <Header />
      <main class="flex-1 w-screen-xl max-w-screen-xl px-safe">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
