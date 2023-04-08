export const _url = 'https://edu.strada.one/api/';
export const _user = 'user/';
export const _messages = 'messages/';

interface bodyType {
  email: string;
}

export async function makeFetchRequest(
  url: string,
  method: string,
  headers: Record<string, string>,
  body?: Record<string, string>
) {
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  return response.json();
}
