# Student Information System

A web-based Student Information System built with **Vue 3** that allows managing student data with functionalities like **search, pagination, sorting, adding, editing, and deleting students**. The project uses **localStorage** for data persistence and provides a responsive, interactive UI.

## Features

- **Add Students**: Register new students with required fields (ID, Name, Date of Birth, Municipality).  
- **Edit Students**: Modify student information using a form.  
- **Delete Students**: Remove students from the system.  
- **Archive Students**: Archive students without deleting them permanently and view or restore them.
- **Search**: Search students by ID, Name, Date of Birth, or Municipality.  
- **Pagination**: Automatically paginates when there are more than 10 records.  
- **Sorting**: Sort students by ID, Name, Date of Birth, or Municipality in ascending/descending order.  
- **Responsive UI**: Clean table design with a light blue color theme.

## Technologies Used

- **Vue 3** with `<script setup>` syntax  
- **Composition API** (`ref`, `computed`, `onMounted`)  
- **LocalStorage** for persistent data  
- **HTML5 & CSS3** for structure and styling  


## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/elmaejupi/Elma-Ejupi-StudentInformationSystem
cd student-information-system
```

2. **Install dependencies**
```
npm install
```

3. **Run the development server**
```
npm run dev
```

4. **Open the application**

Navigate to http://localhost:5173 (or the URL provided by your terminal) in your browser



## Usage

Use the Register New Student button to add a student.

Search using the input at the top by any field.

Click on column headers to sort students in ascending/descending order.

Use pagination controls at the bottom to navigate pages.

Edit or delete students directly from the table using the buttons.