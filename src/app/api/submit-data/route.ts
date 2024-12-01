import { NextResponse } from 'next/server';
import { savePersonalData } from '../../../../db';

export async function POST(request: Request) {
  try {
    const { name, postalCode } = await request.json();

    if (!name || !postalCode) {
      return NextResponse.json(
        { error: 'Brak wymaganych danych' },
        { status: 400 }
      );
    }

    const result = await savePersonalData(name, postalCode);
    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas zapisywania danych' },
      { status: 500 }
    );
  }
} 