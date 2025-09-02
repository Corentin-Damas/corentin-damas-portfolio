# Lightbox Component - Architecture Refactorisée

## 📁 Structure

```
lightbox/
├── index.ts                    # Point d'entrée principal
├── Lightbox.tsx               # Composant principal refactorisé
├── Lightbox.module.css        # Styles CSS
├── types.ts                   # Types TypeScript centralisés
├── hooks/                     # Hooks personnalisés
│   ├── useLightboxNavigation.ts
│   ├── useSwipeGestures.ts
│   ├── useKeyboardNavigation.ts
│   ├── useImagePreloading.ts
│   └── useLightboxState.ts
└── components/                # Composants UI séparés
    ├── LightboxImage.tsx
    ├── LightboxControls.tsx
    ├── LightboxInfoPanel.tsx
    └── ColorPalette.tsx
```

## 🚀 Améliorations apportées

### **Performance**

- ✅ **React.memo** sur tous les sous-composants
- ✅ **useMemo** pour les calculs coûteux (palette, variables CSS)
- ✅ **useCallback** pour les fonctions de callback
- ✅ **Hooks séparés** pour éviter les re-renders inutiles

### **Lisibilité**

- ✅ **Composant principal** réduit de 375 à ~100 lignes
- ✅ **Logique séparée** en hooks spécialisés
- ✅ **Composants UI** modulaires et réutilisables
- ✅ **Types centralisés** dans un fichier dédié

### **Maintenabilité**

- ✅ **Architecture modulaire** facile à étendre
- ✅ **Hooks réutilisables** pour d'autres composants
- ✅ **Séparation des responsabilités** claire
- ✅ **Code plus testable** avec des unités plus petites

## 🎯 Utilisation

```tsx
import Lightbox from "./lightbox";

<Lightbox
  images={images}
  index={currentIndex}
  onClose={() => setIndex(null)}
  onNavigate={setIndex}
/>;
```

## 🔧 Hooks disponibles

- `useLightboxNavigation` - Gestion de la navigation
- `useSwipeGestures` - Gestion des gestes tactiles
- `useKeyboardNavigation` - Navigation clavier
- `useImagePreloading` - Preload des images voisines
- `useLightboxState` - État global de la lightbox

## 📱 Prochaines étapes (Phase 2)

- [ ] Implémentation du zoom mobile
- [ ] Amélioration des gestes tactiles
- [ ] Mode plein écran
- [ ] Partage et téléchargement d'images
