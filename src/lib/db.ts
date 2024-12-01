import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

const config = {
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
};

export async function savePersonalData(name: string, postalCode: string) {
  noStore();
  try {
    console.log('Próba zapisania danych:', { name, postalCode });
    console.log('Używany connection string:', process.env.POSTGRES_URL_NON_POOLING);
    
    const result = await sql.query(
      'INSERT INTO personal_data (name, postal_code) VALUES ($1, $2) RETURNING id, name, postal_code',
      [name, postalCode]
    );
    
    console.log('Wynik zapytania:', result);
    return result.rows[0];
  } catch (error: any) {
    console.error('Szczegóły błędu bazy danych:', {
      message: error?.message,
      code: error?.code,
      detail: error?.detail,
      where: error?.where,
      hint: error?.hint
    });
    throw new Error(`Nie udało się zapisać danych osobowych: ${error?.message || 'Nieznany błąd'}`);
  }
}

export async function fetchRevenue() {
  noStore();
  try {
    const data = await sql`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
} 