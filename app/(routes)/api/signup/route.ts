import { APIManagerServerSide } from "@classes/APIManagerServerSide";

export async function POST(request: Request) {
  try {
    const signUpBody = await request.json();
    console.log(signUpBody);
    const response = await APIManagerServerSide.signUp(signUpBody);

    return new Response(JSON.stringify(response), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao processar a requisição" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}