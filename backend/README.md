# LOG DE DESARROLLO

---

### **Expedientes**

1. 13-9-22: Se identificaron los requerimiento del sistema para el Instituto RANDOM 2022 ✔
2. 13-9-22: Se pasaron los requerimientos a un word y se creo el diagrama de casos de uso ✔
3. 14-9-22: Se comenzo el modelado para la base de datos. ✔

### Modelo de Persona

```js
{
  nombre_persona: Schema.Types.String,
  apellido_persona: Schema.Types.String,
  dni_persona: {
    type: Schema.Types.String,
    max: 8,
    min: 8,
    unique: true,
  },
  cuil_persona: {
    type: Schema.Types.String,
    max: 11,
    min: 11,
    unique: true,
  },
  fecha_nac_persona: Schema.Types.String,
  sexo_persona: {
    type: Schema.Types.String,
    enum: ["Masculino", "Femenino", "Undefined"],
  },
  correo_persona: {
    type: Schema.Types.String,
    unique: true,
  },
  telefono_persona: {
    type: Schema.Types.String,
    unique: true,
  },
  direccion_persona: {
    manzana: Schema.Types.String,
    casa: Schema.Types.String,
    sector: Schema.Types.String,
    lote: Schema.Types.String,
    parcela: Schema.Types.String,
  },

  documentaciones: [{
    url_documento: Schema.Types.String,
    tipo_documento: {
      type: Schema.Types.String,
      enum: ["Analitico", "Domicilio"],
    },
  }],

  inasistencias: [{
    fecha: Schema.Types.Date,
  }],

  _materia: [{
    type: Schema.Types.ObjectId,
    ref: "Persona",
  }],

  nombre_usuario: {
    type: Schema.Types.String,
    unique: true,
  },
  password_usuario: Schema.Types.String,

  fecha_alta: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  activo: {
    type: Schema.Types.Boolean,
    default: true,
  },

  roles: {
    descripcion_rol: {
      type: Schema.Types.String,
      enum: ["alumno", "docente", "administrativo"],
    },
    acceso_endpoint: {
      type: Schema.Types.Array,
    },
  },
}
```

### Modelo de Nota

```js
{
  _materia: [{
    type: Schema.Types.ObjectId,
    ref: "materias",
  }],

  _persona: [{
    type: Schema.Types.ObjectId,
    ref: "personas",
  }],

  descripcion_nota: {
    type: Schema.Types.Decimal128,
  },

  tipo_nota: {
    type: Schema.Types.String,
    enum: ["primer parcial", "segundo parcial", "recuperatorio", "recuperatorio extraordinaria"],
  },

  descripcion_materia: {
    type: Schema.Types.String,
  },
}
```

### Modelo de Aviso

```js
{
  descripcion_aviso: {
    type: Schema.Types.String,
  },

  tipo_aviso: {
    type: Schema.Types.String,
    enum: ["general", "particular"],
  },

  _persona: [{
    type: Schema.Types.ObjectId,
    ref: "personas",
  }],
}
```

### Modelo de Materia

```js
{
  descripcion_materia: {
    type: Schema.Types.String,
    unique: true,
  },

  nombre_carrera: {
    type: Schema.Types.String,
    enum: ["Tecnico en Programación"],
  },

  horarios: {
    dia_semana: {
      type: Schema.Types.String,
      enum: ["lunes", "martes", "miercoles", "jueves", "viernes"],
    },
    horario_semana: {
      type: Schema.Types.String,
      enum: ["09:40 a 10:00", "10:00 a 10:40", "10:40 a 11:20", "11:20 a 12:00", "12:00 a 14:00", "14:00 a 14:40", "14:40 a 15:20", "15:20 a 16:00", "16:00 a 17:00"],
    },
    activo: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },

  anio_lectivo: [{
    descripcion_anio: {
      type: Schema.Types.String,
      unique: true,
    },
    activo: {
      type: Schema.Types.String,
      default: true,
    },
  }],
}
```

4. 15-9-22: Se crearon los esquemas de: **_Usuarios_**, **_Notas_**, **_Materias_**, **_Personas_**, **_Calles_**, **_Barrios_**. ✔
5. 16-9-22: Se fusiono el modelo de usuarios con personas, se agrego el atributo de horarios y de año lectivo al modelo de materias y se creo la colección de avisos. ✔
6. 17-9-22: Se creo la cuenta de MongoDB Atlas y también se configura el usuario para la conexion. ✔
7. 18-9-22: Se comenzo con los mockups para las interfaces del sistema, se creo la estructura base de carpetas para el **_backend_** y se instalaron las dependencias necesarias. ✔
8. 20-9-22: Se comenzo con la creación de los test para el modelo de **_Personas_**. ✔
9. 22-9-22: Se quitaron los modelos de **_Calles_** y **_Barrios_**. ✔
10. 23-9-22: Se completaron los test para la autentificación de un usuario y se agrego Json Web Token para el acceso a la API. ✔
11. 24-9-22: Se completo el desarrollo de los tests para el tipo de usuario ADMINISTRATIVO del metodo POST para el modelo de **_Personas_**. ✔
12. 25-9-22: Se crearon los modelos de **_Notas_**, **_Materias_** y **_Avisos_**. ✔
13. 27-9-22: Se completo el desarrollo de los tests para el tipo de usuario ADMINISTRATIVO del metodo PUT para el modelo de **_Personas_**. ✔
14. 28-9-22: Se completo el desarrollo de los tests para el tipo de usuario ADMINISTRATIVO del metodo GET y GET con ID para el modelo de **_Personas_**. ✔
15. 28-9-22: Se completo el desarrollo de los tests para el tipo de usuario ADMINISTRATIVO del metodo DELETE y PATCH para el modelo de **_Personas_**. ✔
16. 29-9-22: Se agrego middleware para verificar las rutas a la cuales tiene acceso un usuario. ✔
17. 1-9-22: Se completo el desarrollo de los tests para los metodos GET, GET con ID, POST, PUT, PATCH, DELETE para el modelo de **_Materias_**. ✔
18. 2-9-22: Se completo el desarrollo de los tests para los metodos GET, GET con ID, POST, PUT, PATCH, DELETE para el modelo de **_Notas_**. ✔
