import { NextResponse } from 'next/server';
import { savePersonalData } from '@/lib/db';

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
    
    if (!result) {
      throw new Error('Nie udało się zapisać danych');
    }
    
    return NextResponse.json({ success: true, id: result.id });
  } catch (error: any) {
    console.error('Szczegóły błędu:', {
      message: error?.message || 'Nieznany błąd',
      name: error?.name || 'Nieznany typ błędu'
    });
    
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas zapisywania danych' },
      { status: 500 }
    );
  }
} 