# MediTouch

meditouch is an innovative mobile application designed to empower users with an intuitive way of tracking their health symptoms. Leveraging the power of a 3D human model view, meditouch provides a unique approach to health tracking that aims to be both user-friendly and comprehensive.

## Overview

Meditouch leverages the 3D human model view to facilitate easy and accurate symptom recording. Users can simply tap on the corresponding area on the 3D model where they're experiencing symptoms and provide additional details if necessary. This approach not only makes it straightforward for users to record their symptoms but also ensures that the recorded data is precise, helping both users and health professionals understand the health situation better.

## Technology Stack

### Frontend
<img src="https://github.com/mindongdong/health-record/blob/main/app/src/assets/react_native.png?raw=true" height="300px" width="500px">
<img src="https://github.com/mindongdong/health-record/blob/main/app/src/assets/three.png?raw=true" height="300px" width="300px">

The frontend of meditouch is built using **React-Native**. This choice of technology ensures that our application is cross-platform, allowing us to reach a wider range of users regardless of the device they are using.

We further enhance the user experience by incorporating **three.js** and **react-three/fiber/native libraries**, which enable the implementation of the 3D model view. This integration allows users to visually log their symptoms onto a 3D human model, creating a more interactive and intuitive user experience.

### Backend
<img src="https://github.com/mindongdong/health-record/blob/main/app/src/assets/fastapi.png?raw=true" height="300px" width="500px">
<img src="https://github.com/mindongdong/health-record/blob/main/app/src/assets/postgresql.svg.png?raw=true" height="300px" width="300px">

The backend of meditouch uses **FastAPI** - a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. This choice was driven by its speed and simplicity, making our app efficient and easy to maintain.

Our database of choice is **PostgreSQL**, a powerful, open-source, object-relational database system that uses and extends the SQL language combined with many features that safely store and scale complicated data workloads. The data recorded by users in the meditouch app is securely stored in this DB.
