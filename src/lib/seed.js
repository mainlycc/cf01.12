const { sql } = require('@vercel/postgres');

async function createPersonalDataTable() {
  try {
    console.log('Tworzenie tabeli personal_data...');
    console.log('Connection string:', process.env.POSTGRES_URL_NON_POOLING);
    
    await sql.query(`
      CREATE TABLE IF NOT EXISTS personal_data (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        postal_code VARCHAR(6) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabela personal_data została utworzona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas tworzenia tabeli personal_data:', {
      message: error.message,
      code: error.code,
      detail: error.detail
    });
    throw error;
  }
}

async function main() {
  try {
    await createPersonalDataTable();
    console.log('Inicjalizacja bazy danych zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji bazy danych:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main(); 