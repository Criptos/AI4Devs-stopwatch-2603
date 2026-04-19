crea un spec de UI para generar una interfaz basada en html, javascript y css vainilla utilizando como referencia la imagen stopwatch.png

actualiza el archivo index.html para crear un sistema totalmente basado en javascript vainilla que primero te deje elegir si quieres un stopwatch o un countdow, si el usuario seleccion aun stop watch debe de aparecer una interfaz con un diplay de cronometro, dos botoenes, uno de ellos para iniciar y otro para limpiar el estado a 0.
Cual el usuario le da iniciar el stopwatch, el letrero cambia a pausa, y el stopwatch comienza a contar el tiempo en formato hh:mm:ss:uuuu cuenta el tiempo hatsa que el boton de pausa sea clickeado, en ese moneto el reloj debe de detenre su cuenta, y el boton de pausa cambia a continuar, en el caso de que el boton de contiuar le den click, deberan de continuar, asi hasta que el boton de clear se le de clicky debera de regresar al reloj a su posicion inicial.

la pantalla del stopwatch debera de contar tambien un boton para regresar a la pantalla inicial donde se pueda seleccionar stopwathc o un countdown

si en la pantalla inicial el usuario da click en countdown debe de aparecer una pantalla que muestre el reloj y botones del 0 al 9 para establecer el tiempo, cada click debera de ir llenado lo digitos del stopwatch para establcer el tiempo hasta un maximo de 99:99:99:99999 utilzando que corresponde al tiempo de lformato hh:mm:ss:uuuu una vez estsablecido el tiempo al dar click en un boton llamdo set, recalcular el tiempo a dd:hh:mm:ss:uuuu interpretado corectamete de la entrada y ofrecer 2 botones, uno  que diga clear y otro que diga start, el boton de clear regresa a la pantalla naterior para volver a establecer el tiempo, al dar start el stopwatch comienza cuenta regresia a 0, y el boton cambia a pause, si se le da click en pause debera de tener el stop watch y cambiar el letrero a conitnue, si le dan click en conitnue debera de continuar con el coutdown, esto lo puede hacer hasta que el coutndown llege a 0,
o si en la pantalla inicial el usuario da click en countdown debe de aparecer una pantalla que muestre el reloj y botones del 0 al 9 para establecer el tiempo, cada click debera de ir llenado lo digitos del stopwatch para establcer el tiempo hasta un maximo de 99:99:99:99999 utilzando que corresponde al tiempo de lformato hh:mm:ss:uuuu una vez establecido el tiempo al dar click en un boton llamado set, recalcular el tiempo a dd:hh:mm:ss:uuuu interpretado corectamete de la entrada y ofrecer 2 botones, uno  que diga clear y otro que diga start, el boton de clear regresa a la pantalla naterior para volver a establecer el tiempo, al dar start el stopwatch comienza cuenta regresia a 0, y el boton cambia a pause, si se le da click en pause debera de tener el stop watch y cambiar el letrero a conitnue, si le dan click en conitnue debera de continuar con el coutdown, esto lo puede hacer hasta que el coutndown llege a 0, en cualqier momento se le puede dar boton de clear y regresar al aantalla de definir el coutdown siempre se debera de regresar a la sigiente pantalla con felecha de regresar


Este es un prompt optimizado y estructurado bajo una lógica de **Especificación de Requerimientos de Software (SRS)**. Está diseñado para que una IA genere código limpio, modular y profesional, separando las reglas de negocio de la implementación técnica.

---

# Prompt Optimizado

**Actúa como un Desarrollador Senior de Frontend.** Tu objetivo es generar un sistema de gestión de tiempo autocontenido utilizando **HTML5 (con CSS incrustado)** y **JavaScript Vainilla (script.js)**. El sistema debe ser una Single Page Application (SPA) que gestione estados de vista sin recargar la página.

## 1. Estructura de Archivos
* **index.html:** Debe contener la estructura base, el CSS en una etiqueta `<style>` y la referencia al script.
* **script.js:** Debe contener toda la lógica de negocio, manipulación del DOM y gestión de timers.

## 2. Reglas de Negocio

### A. Pantalla de Inicio (Selector de Modo)
* Debe permitir la elección entre dos módulos: **Stopwatch** (Cronómetro) y **Countdown** (Cuenta regresiva).
* Cada módulo debe tener un botón de "Regresar" para volver a esta pantalla inicial.

### B. Módulo de Stopwatch (Cronómetro Ascendente)
1.  **Display:** Formato `hh:mm:ss:uuuu` (horas, minutos, segundos, microsegundos).
2.  **Estado Inicial:** Reloj en cero. Botones: [Start] y [Clear].
3.  **Lógica de Botones:**
    * **Start:** Inicia el conteo ascendente. El botón cambia a **[Pause]**.
    * **Pause:** Detiene el conteo. El botón cambia a **[Continue]**.
    * **Continue:** Reanuda el conteo desde el tiempo actual. El botón vuelve a **[Pause]**.
    * **Clear:** Detiene el conteo y resetea el display a `00:00:00:0000`.

### C. Módulo de Countdown (Cuenta Regresiva)
1.  **Modo Entrada (Input):** * Mostrar teclado numérico (0-9).
    * Entrada de derecha a izquierda con máscara `hh:mm:ss:uuuu` (máximo 99:99:99:9999).
2.  **Acción Set (Normalización):** * Al presionar **[Set]**, el sistema debe recalcular el tiempo ingresado a formato de días: `dd:hh:mm:ss:uuuu`. 
    * *Ejemplo:* Si el usuario ingresa 90 minutos, se normaliza a 00:01:30:00:0000.
3.  **Modo Ejecución:**
    * Tras el "Set", aparecen botones **[Start]** y **[Clear]**.
    * **Start:** Inicia la cuenta regresiva. El botón conmuta entre **[Pause]** y **[Continue]**.
    * **Clear:** Regresa a la pantalla de "Modo Entrada" para definir un nuevo tiempo.
    * **Finalización:** Al llegar a 0, el sistema se detiene automáticamente.

## 3. Especificaciones Técnicas
* **Precisión:** El manejo de microsegundos (`uuuu`) debe ser preciso mediante el uso de `performance.now()` o el objeto `Date` para evitar el desfase del `setInterval`.
* **Navegación:** Implementar una función de renderizado que limpie el contenedor principal al cambiar de pantalla.
* **Código:** Utilizar ES6+, nombres de variables descriptivos y comentarios en las funciones principales de conversión de tiempo.

## 4. Diseño y UI
* El diseño visual, paleta de colores, espaciados y tipografía deben cumplir estrictamente con las directrices definidas en el archivo institucional: **specs/ui.spec**.
* Asegurar que la interfaz sea responsiva y los botones tengan estados visuales (hover/active).



