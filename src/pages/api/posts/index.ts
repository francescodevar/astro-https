import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (slug) {
        const post = await getEntry('blog', slug);

        if (post) {
            return new Response(JSON.stringify(post), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } else {
            return new Response(JSON.stringify({ msg: `Post ${slug} not found` }), {
                status: 404, // Cambiado de 201 a 404 para indicar que no se encontró el post
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
    } else {
        const posts = await getCollection('blog');
        return new Response(JSON.stringify(posts), {
            status: 200, // Usamos 200 para indicar éxito al listar todos los posts
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
};
