import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { Header } from "~/components/layout/header/header";
import { AssistantContext, initialState } from "~/state/assistant.state";

export default component$(() => {
  const assistantState = useStore(initialState);
  useContextProvider(AssistantContext, assistantState);

  return (
    <div class="flex flex-col items-center">
      <Header />
      <main class="flex-1 w-screen-xl max-w-screen-xl">
        <Slot />
      </main>
    </div>
  );
});
