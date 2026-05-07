# Prompt: Construyendo la API route de generación

**Módulo:** 03 — Backend: Motor de Specs
**Contexto:** Se usa después de tener el CLAUDE.md del proyecto configurado.

---

## Prompt

```
Crea una API route en /app/api/generate-spec/route.ts que:

1) Reciba un POST con un campo 'description' (string).

2) Use el Anthropic SDK para enviar esa descripción a Claude con un prompt de sistema que le pida generar una spec técnica en 6 secciones: visión, usuarios, funcionalidades, flujos, arquitectura y requisitos.

3) Devuelva la spec como JSON estructurado.

4) Maneje errores devolviendo un mensaje claro. Revisa el CLAUDE.md para contexto del proyecto.
```

---

## Cuándo usarlo

Al construir el endpoint principal de generación de specs. Claude lee el CLAUDE.md del proyecto para tener contexto del stack y convenciones antes de escribir el código.
