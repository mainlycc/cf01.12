const { sql } = require('@vercel/postgres');

async function createPersonalDataTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS personal_data (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        postal_code VARCHAR(6) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Tabela personal_data została utworzona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas tworzenia tabeli personal_data:', error);
    throw error;
  }
}

async function createRevenueTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        id SERIAL PRIMARY KEY,
        month VARCHAR(4),
        revenue INT
      );
    `;

    console.log('Tabela revenue została utworzona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas tworzenia tabeli revenue:', error);
    throw error;
  }
}

async function seedRevenueData() {
  try {
    await sql`
      INSERT INTO revenue (month, revenue)
      VALUES 
        ('Jan', 2000),
        ('Feb', 1800),
        ('Mar', 2200),
        ('Apr', 2500),
        ('May', 2300),
        ('Jun', 3200)
      ON CONFLICT (id) DO NOTHING;
    `;

    console.log('Dane zostały dodane do tabeli revenue');
  } catch (error) {
    console.error('Błąd podczas dodawania danych:', error);
    throw error;
  }
}

async function main() {
  try {
    await createPersonalDataTable();
    await createRevenueTable();
    await seedRevenueData();
  } catch (error) {
    console.error('Błąd podczas inicjalizacji bazy danych:', error);
  } finally {
    process.exit(0);
  }
}

main(); 