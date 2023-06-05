import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabase-client'
import { NextResponse } from 'next/server';

// Endpoint: /api/dreams
// Method: GET
// Returns: All dreams (sorted by created_at)
// Status: 200 => Success, 500 => Error, 404 => Not Found
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url || '', 'http://localhost:3000')
    const user_id = searchParams.get('user_id') || ''
    const limit = Number(searchParams.get('limit')) || 10
    const offset = Number(searchParams.get('offset')) || 0
    const dream_id = searchParams.get('dream_id') || ''

    if (dream_id) {
        const { data, error } = await supabase
            .from('dreams')
            .select()
            .eq('id', dream_id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error }, { status: 404 })
            }
            return NextResponse.json({ error }, { status: 500 })
        }
        return NextResponse.json(data)
    }
    else if (user_id) {
        const { data, error } = await supabase
            .from('dreams')
            .select()
            .eq('user_id', user_id)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error }, { status: 404 })
            }
            return NextResponse.json({ error }, { status: 500 })
        }

        return NextResponse.json(data)
    }
    else {
        const { data, error } = await supabase
            .from('dreams')
            .select()
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (error) {
            return NextResponse.json({ error }, { status: 500 })
        }

        return NextResponse.json(data)
    }
}

// Endpoint: /api/dreams
// Method: POST
// Returns: null
// Status: 200 => Success, 500 => Error
export async function POST(req: Request) {
    const body = await req.json()
    const { data, error } = await supabase
        .from('dreams')
        .insert(body)

    if (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
    return NextResponse.json(data)
}

// Endpoint: /api/dreams
// Method: PUT
// Returns: null
// Status: 200 => Success, 500 => Error, 404 => Not Found
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url || '', 'http://localhost:3000')
    const dream_id = searchParams.get('dream_id') || ''
    const body = await req.json()

    const { data, error } = await supabase
        .from('dreams')
        .update(body)
        .eq('id', dream_id)
    if (error) {
        if (error.code === 'PGRST116') {
            return NextResponse.json({ error }, { status: 404 })
        }
        return NextResponse.json({ error }, { status: 500 })
    }
    return NextResponse.json(data)
}

// Endpoint: /api/dreams
// Method: DELETE
// Returns: null
// Status: 200 => Success, 500 => Error, 404 => Not Found
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url || '', 'http://localhost:3000')
    const dream_id = searchParams.get('dream_id') || ''

    const { data, error } = await supabase
        .from('dreams')
        .delete()
        .eq('id', dream_id)
    if (error) {
        if (error.code === 'PGRST116') {
            return NextResponse.json({ error }, { status: 404 })
        }
        return NextResponse.json({ error }, { status: 500 })
    }
    return NextResponse.json(data)
}
