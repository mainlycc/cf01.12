import { NextResponse } from 'next/server';
import { savePersonalData } from '@/lib/db';

export async function POST(request: Request) {
  try {
    console.log('Otrzymano żądanie POST');
    
    const body = await request.json();
    console.log('Otrzymane dane:', body);
    
    const { name, postalCode } = body;

    if (!name || !postalCode) {
      console.log('Brak wymaganych danych:', { name, postalCode });
      return NextResponse.json(
        { error: 'Brak wymaganych danych' },
        { status: 400 }
      );
    }

    console.log('Próba zapisania danych do bazy...');
    const result = await savePersonalData(name, postalCode);
    
    if (!result) {
      console.error('Brak wyniku z bazy danych');
      throw new Error('Nie udało się zapisać danych - brak odpowiedzi z bazy');
    }
    
    console.log('Dane zapisane pomyślnie:', result);
    return NextResponse.json({ 
      success: true, 
      id: result.id,
      data: result 
    });
  } catch (error: any) {
    console.error('Szczegóły błędu API:', {
      message: error?.message || 'Nieznany błąd',
      name: error?.name || 'Nieznany typ błędu',
      stack: error?.stack
    });
    
    return NextResponse.json(
      { 
        error: 'Wystąpił błąd podczas zapisywania danych',
        details: error?.message 
      },
      { status: 500 }
    );
  }
} 