# Documentation de l'API de Gestion des Catways

## Table des matières
- [Introduction](#introduction)
- [Authentification](#authentification)
- [Endpoints](#endpoints)
  - [Catways](#catways)
  - [Utilisateurs](#utilisateurs)
  - [Réservations](#réservations)

## Introduction

Cette API REST permet de gérer un système de réservation de catways. Elle fournit des endpoints pour gérer les utilisateurs, les catways et les réservations.

### Base URL
```
http://localhost:8000/api
```

### Format des réponses
Toutes les réponses sont au format JSON.

## Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification. La plupart des endpoints nécessitent un token valide.

### Headers requis
```
Authorization: Bearer <token>
```

## Endpoints

### Catways

#### Récupérer tous les catways
```http
GET /api/catways
```
**Authentification requise**: Oui
**Réponse**: Liste des catways
```json
[
  {
    "id": "string",
    "number": "string",
    "type": "string",
    "status": "string"
  }
]
```

#### Récupérer un catway par ID
```http
GET /api/catways/:id
```
**Authentification requise**: Oui
**Paramètres**:
- `id` (path) - ID du catway
**Réponse**: Détails du catway

#### Créer un nouveau catway
```http
POST /api/catways
```
**Authentification requise**: Oui
**Body**:
```json
{
  "number": "string",
  "type": "string",
  "status": "string"
}
```

#### Mettre à jour un catway
```http
PATCH /api/catways/:id
```
**Authentification requise**: Oui
**Paramètres**:
- `id` (path) - ID du catway
**Body**: Données à mettre à jour

#### Supprimer un catway
```http
DELETE /api/catways/:id
```
**Authentification requise**: Oui
**Paramètres**:
- `id` (path) - ID du catway

### Utilisateurs

#### Authentification
```http
POST /api/users/authenticate
```
**Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Réponse**: Token JWT et informations utilisateur

#### Créer un utilisateur
```http
PUT /api/users/add
```
**Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Récupérer tous les utilisateurs
```http
GET /api/users
```
**Authentification requise**: Oui
**Réponse**: Liste des utilisateurs

#### Récupérer un utilisateur par ID
```http
GET /api/users/:id
```
**Authentification requise**: Oui
**Paramètres**:
- `id` (path) - ID de l'utilisateur

#### Mettre à jour un utilisateur
```http
PATCH /api/users/:id
```
**Authentification requise**: Oui
**Paramètres**:
- `id` (path) - ID de l'utilisateur
**Body**: Données à mettre à jour

#### Supprimer un utilisateur
```http
DELETE /api/users/:id
```
**Authentification requise**: Oui
**Paramètres**:
- `id` (path) - ID de l'utilisateur

### Réservations

#### Créer une réservation
```http
POST /api/reservations
```
**Body**:
```json
{
  "catwayNumber": "string",
  "startDate": "date",
  "endDate": "date",
  "userId": "string"
}
```

#### Récupérer toutes les réservations
```http
GET /api/reservations
```
**Réponse**: Liste des réservations

#### Récupérer une réservation par ID
```http
GET /api/reservations/:id
```
**Paramètres**:
- `id` (path) - ID de la réservation

#### Mettre à jour une réservation
```http
PUT /api/reservations/:id
```
**Paramètres**:
- `id` (path) - ID de la réservation
**Body**: Données à mettre à jour

#### Supprimer une réservation
```http
DELETE /api/reservations/:id
```
**Paramètres**:
- `id` (path) - ID de la réservation

#### Récupérer les réservations par catway
```http
GET /api/reservations/catway/:catwayNumber
```
**Paramètres**:
- `catwayNumber` (path) - Numéro du catway

#### Vérifier la disponibilité d'un catway
```http
GET /api/reservations/availability/:catwayNumber
```
**Paramètres**:
- `catwayNumber` (path) - Numéro du catway
**Query Parameters**:
- `startDate` - Date de début
- `endDate` - Date de fin
**Réponse**:
```json
{
  "available": boolean
}
```

## Codes d'erreur

- `400` - Requête invalide
- `401` - Non authentifié
- `404` - Ressource non trouvée
- `500` - Erreur serveur

## Exemples de réponses d'erreur

```json
{
  "name": "API",
  "version": "1.0",
  "status": 404,
  "message": "not-found"
}
```

```json
{
  "name": "API",
  "version": "1.0",
  "status": 500,
  "message": "Internal Server Error"
}
``` 