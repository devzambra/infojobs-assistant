import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Offer } from "~/components/offer/offer";
import { AssistantContext } from "~/state/assistant.state";

export type AssistantForm = {
  answer: string;
};

export default component$(() => {
  const state = useContext(AssistantContext);

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
                haciendo clic en "Comenzar..." o pulsando "Cmd + K"
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
