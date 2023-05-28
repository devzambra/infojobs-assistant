import { component$ } from "@builder.io/qwik";
import { Logo } from "../icons/logo";

export const Offer = component$(({ offer }: any) => {
  return (
    <a
      target="_blank"
      key={offer.id}
      href={offer.link}
      class="bg-white p-6 rounded-lg shadow-lg w-full"
    >
      <article class="flex gap-12 items-center">
        {offer.author.logoUrl ? (
          <img
            src={offer.author.logoUrl}
            alt="offer logo"
            class="w-24 h-24 hidden sm:block"
            width={96}
            height={96}
          />
        ) : (
          <div class="w-24 h-24">
            <Logo />
          </div>
        )}
        <div>
          <h2 class="text-xl font-bold">{offer.title}</h2>
          <p class="font-thin">
            {offer.category.value} - {offer.subcategory.value}
          </p>
          <p class="font-thin">Experiencia: {offer.experienceMin.value}</p>
          <p class="font-thin">Estudios: {offer.study.value}</p>
          <p class="font-light">
            {offer.city} - {offer.teleworking.value}
          </p>
          <p class="font-light">
            Contrato: {offer.contractType.value} - Jornada:{" "}
            {offer.workDay.value}
          </p>
          <p class="font-semibold">Salario: {offer.salaryDescription}</p>
        </div>
      </article>
    </a>
  );
});
