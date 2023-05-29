import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";

import { AssistantContext, QUESTIONS } from "~/state/assistant.state";

const fetchOffers = async (params: any) => {
  let queryString = "";
  const prefix = () => (queryString.length == 0 ? "?" : "&");
  if (params.query) queryString += prefix() + "q=" + params.query;
  if (params.city) queryString += prefix() + "city=" + params.city;
  if (params.salaryMin)
    queryString += prefix() + "salaryMin=" + params.salaryMin;
  if (params.salaryPeriod)
    queryString += prefix() + "salaryPeriod=" + params.salaryPeriod;

  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_API_ROOT}${queryString.replace(/\s/gi, "-")}`,
      {
        headers: {
          Authorization: `Basic ${import.meta.env.PUBLIC_API_TOKEN}`,
        },
      }
    );
    return response.ok ? response.json() : null;
  } catch (e) {
    return null;
  }
};

export default component$(() => {
  const state = useContext(AssistantContext);
  const isLoading = useSignal(false);
  const hasError = useSignal(false);
  const nav = useNavigate();

  const submitForm = $(async (event: any) => {
    const answer = new FormData(event.srcElement).get("answer")?.toString();
    if (answer) {
      state.chatBubles.unshift({ class: "userBuble", value: answer });
      if (QUESTIONS[state.currentQuestion + 1]) {
        state.chatBubles.unshift({
          class: "assistantBuble",
          value: QUESTIONS[++state.currentQuestion],
        });
      } else {
        isLoading.value = true;
        const answers = state.chatBubles
          .filter((c) => c.class === "userBuble")
          .map((a) => a.value);
        const data = await fetchOffers({
          query: answers[4] + "," + answers[3] + "," + answers[2],
          city: answers[0],
          salaryMin: answers[1],
          salaryPeriod: "bruto-ano",
        });

        if (!data) {
          isLoading.value = false;
          hasError.value = true;
          return;
        }

        state.offers = data.offers;
        isLoading.value = false;
        state.currentQuestion = 0;
        state.chatBubles = [
          { class: "assistantBuble", value: QUESTIONS[state.currentQuestion] },
        ];
        nav("/");
      }
      event.srcElement.reset();
    }
  });

  return (
    <div class="backdrop-blur-md bg-white/30 flex flex-col h-screen justify-center items-center z-10 absolute top-0 bottom-0 left-0 right-0">
      <div class="backdrop-blur-xl bg-gray-100/30 shadow-md shadow-gray-200 sm:w-[95%] w-full sm:h-[95%] h-full border-white border-2 opacity-100 rounded-xl flex flex-col  mx-auto max-w-screen-xl">
        {isLoading.value || hasError.value ? (
          <>
            <div
              role="status"
              class="flex flex-col items-center justify-center flex-1 gap-8"
            >
              <h3 class="sm:text-2xl text-xl font-semibold text-center">
                {isLoading.value
                  ? "Estamos buscando las mejores ofertas para ti."
                  : "Ha ocurrido un error, por favor, inténtalo de nuevo."}
              </h3>
              {isLoading.value ? (
                <svg
                  aria-hidden="true"
                  class="sm:w-40 sm:h-40 w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <>
                  <svg
                    fill="none"
                    class="sm:w-40 sm:h-40 w-32 h-32 text-red-500"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    ></path>
                  </svg>
                  <Link href="" reload>
                    Volver a intentar
                  </Link>
                </>
              )}
              <span class="sr-only">
                {isLoading.value ? "Loading..." : "Error"}
              </span>
            </div>
          </>
        ) : (
          <>
            <Link
              class="m-4 self-end bg-gray-50 w-10 h-10 border-2 border-white shadow-xl rounded-full font-light flex justify-center items-center"
              href="/"
            >
              X
            </Link>
            <ul class="flex flex-col-reverse items-start p-4 flex-1 overflow-y-auto">
              {state.chatBubles.map((q, i) => (
                <li class={q.class} key={i}>
                  {q.value}
                </li>
              ))}
              <li class="assistantBuble">
                Para eso, necesito que contestes algunas preguntas. Allá vamos!:
              </li>
              <li class="assistantBuble">
                Hola! Vamos a ayudarte a buscar la mejor oferta para ti.
              </li>
            </ul>
            <form
              class="flex justify-sart items-center gap-2 p-4"
              preventdefault:submit
              onSubmit$={submitForm}
            >
              <input
                autoFocus
                name="answer"
                type="text"
                placeholder="Escribe tu respuesta..."
                class="border border-blue-400 focus:border-blue-600 outline-none flex flex-1 p-4 rounded-xl bg-gray-100"
              />
              <button
                type="submit"
                class="flex bg-green-500 p-4 text-white uppercase font-bold rounded-xl hover:bg-green-600 focus:animate-[pulse_0.2s_ease-in-out]"
              >
                Enviar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
});
