Bloque 3
Bloque 3: Testing y entrega (1-2 semanas después) - Coordinado con DIW Bloque 3¶

    Fase 7: Testing, optimización y entrega final

COORDINACIÓN CON DIW¶
Fase DWEC 	Paralela a DIW 	Entrega
Fase 7 	DIW Fase 7 	1-2 semanas después
FASE 7: TESTING, OPTIMIZACIÓN Y ENTREGA FINAL¶

Criterios: RA6.f, RA6.g, RA7.g, RA7.i

Entrega: 1 semana después de Navidad (paralela a DIW Fase 7)

Objetivos:

Testing de la aplicación, optimización de rendimiento, verificación cross-browser, y entrega final desplegada.
FASE 7: Testing, optimización y entrega final

Tareas:

- Testing unitario
    - Tests de componentes principales (mínimo 3\)  
    - Tests de servicios (mínimo 3\)  
    - Tests de pipes personalizados (si los hay)  
    - Coverage mínimo del 50%
- Testing de integración
    - Tests de flujos completos (crear producto, login, checkout, etc.)  
    - Mocks de servicios HTTP  
    - Testing de formularios reactivos
- Verificación cross-browser
    - Probar en Chrome, Firefox, Safari (si tienes acceso)  
    - Documentar incompatibilidades encontradas  
    - Aplicar polyfills si es necesario  
    - Verificar que Angular compila para navegadores objetivo
- Verificación cross-browser**
    - Probar en Chrome, Firefox, Safari (si tienes acceso)  
    - Documentar incompatibilidades encontradas  
    - Aplicar polyfills si es necesario  
    - Verificar que Angular compila para navegadores objetivo  
- Optimización de rendimiento
    - Análisis con Lighthouse Performance (objetivo \> 80\)  
    - Lazy loading de módulos verificado  
    - Tree shaking en producción  
    - Optimización de bundles (\< 500KB initial bundle)
- Build de producción**
    - ng build \--configuration production  
    - Verificar que no hay errores ni warnings  
    - Analizar tamaño de bundles con source-map-explorer  
    - Configurar correctamente base-href
- Despliegue
    - Desplegar en la misma URL que DIW  
    - Verificar que todas las rutas funcionan  
    - Verificar que llamadas HTTP funcionan en producción  
    - Configurar correctamente redirects para SPA
- Documentación técnica final**
    - README completo con setup, arquitectura, deploy  
    - Guía de contribución  
    - Changelog de versiones  
    - Decisiones técnicas justificadas

Criterios y entregables

    Criterios: RA6.f, RA6.g, RA7.g, RA7.i
    Entregables:
        Tests unitarios (coverage > 50%)
        Tests de integración de flujos principales
        Verificación cross-browser documentada
        Build de producción optimizado
        Aplicación desplegada en URL pública (misma que DIW)
        Lighthouse Performance > 80
        Documentación técnica completa
        README con URL de producción

