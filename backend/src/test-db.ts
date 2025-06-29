import pool from './db';

async function testConnection() {
  try {
    // Insertar una nueva tarea de prueba
    await pool.query(
      "INSERT INTO tasks (title, status) VALUES ('Probando conexión', 'todo') RETURNING *"
    );

    // Consultar todas las tareas
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id');
    console.log('📦 Tareas en la base de datos:');
    console.table(rows);  // Formato más legible

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await pool.end();
  }
}

testConnection();