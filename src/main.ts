type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}


type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: "American" |
  "British" |
  "Australian" |
  "Israeli-American" |
  "South African" |
  "French" |
  "Indian" |
  "Israeli" |
  "Spanish" |
  "South Korean" |
  "Chinese"
}


/*
Crea una funzione getActress che, dato un id, effettua una chiamata a:

GET /actresses/:id
La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.
*/

function isActress(data: unknown): data is Actress {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string" &&
    "birth_year" in data &&
    typeof data.birth_year === "number" &&
    "biography" in data &&
    typeof data.biography === "string" &&
    "image" in data &&
    typeof data.image === "string" &&
    "most_famous_movies" in data &&
    data.most_famous_movies instanceof Array &&
    "awards" in data &&
    typeof data.awards === "string" &&
    "nationality" in data &&
    typeof data.nationality === "string"
  ) {
    return true
  } else {
    return false
  }
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const res = await fetch(`http://localhost:3333/actresses/${id}`)
    // se la chiamata non va a buon fine
    if (!res.ok) {
      throw new Error("Errore durante la ricezione dei dati")
    }

    const data: unknown = await res.json()
    // se il formato dei dati è errato
    if (!isActress(data)) {
      throw new Error("Formato dei dati errato")
    }

    return data
  }
  catch (err) {
    // se si verificano errori dursnte la chiamata o la validazione
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }

    // in ogni caso in cui c'è un errore
    return null
  }
}
console.log(await getActress(1))