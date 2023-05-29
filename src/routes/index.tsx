import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { Offer } from "~/components/offer/offer";
import { AssistantContext } from "~/state/assistant.state";

export type AssistantForm = {
  answer: string;
};

export default component$(() => {
  const state = useContext(AssistantContext);
  const nav = useNavigate();
  const isMac = useSignal(false);

  useVisibleTask$(() => {
    const listener = (event: KeyboardEvent) => {
      isMac.value = navigator.userAgent.search("Mac") > -1;
      if (
        event.key === "k" &&
        ((isMac && event.metaKey) || (!isMac && event.ctrlKey))
      ) {
        nav("/assistant/");
      }
    };

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  });

  return (
    <>
      {state.offers.length ? (
        <>
          <section class="flex flex-col gap-4 items-center justify-center my-10">
            {state.offers.map((offer) => (
              <Offer key={offer.id} offer={offer} />
            ))}
          </section>
        </>
      ) : (
        <>
          <section class="flex flex-col items-center justify-center mt-10">
            <article class="bg-white p-6 rounded-lg shadow-lg w-3/4">
              <h2 class="text-2xl font-light">
                Aún no hay resultados que mostrar
              </h2>
              <p class="font-thin">
                Para comenzar a ver resultados, por favor, inicia el asistente
                haciendo clic en "Comenzar..." o pulsando{" "}
                <span class="border p-1 rounded-md font-normal bg-blue-200">
                  {isMac ? "⌘" : "Ctrl"} K
                </span>
              </p>
            </article>
          </section>
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Infojobs Assistant",
  meta: [
    {
      name: "description",
      content: "Tu asistente personal de Infojobs",
    },
  ],
};
