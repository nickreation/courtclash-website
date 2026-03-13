# Polices Inter pour Court Clash

## Installation des polices

Pour utiliser les polices Inter dans l'application, téléchargez les fichiers suivants depuis [Google Fonts](https://fonts.google.com/specimen/Inter) et placez-les dans ce dossier :

- `Inter-Regular.ttf`
- `Inter-Medium.ttf`
- `Inter-SemiBold.ttf`
- `Inter-Bold.ttf`

## Alternative : Utilisation des polices système

Si vous ne souhaitez pas ajouter les polices Inter, l'application utilisera automatiquement les polices système par défaut :

- iOS : San Francisco
- Android : Roboto

## Configuration

Les polices sont configurées dans :

- `src/hooks/useFonts.ts` - Hook pour charger les polices
- `src/utils/fonts.ts` - Configuration des polices
- `tailwind.config.js` - Configuration Tailwind pour les polices
