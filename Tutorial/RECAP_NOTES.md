# Mashupstack Full Stack Course — Recap Notes

## 1. HTML

### Structure
- `<!DOCTYPE html>` → `<html lang="en">` → `<head>` (meta, title, link, style) → `<body>`
- Semantic tags: `<h1>`–`<h6>`, `<p>`, `<blockquote>`, `<q>`, `<dl>/<dt>/<dd>`, `<ul>/<ol>/<li>`

### Key Elements
| Element | Attributes | Lab |
|---------|-----------|-----|
| `<img>` | `src`, `alt`, `height`, `width` | Lab1 |
| `<a>` | `href`, `target="_blank"` | Lab1, Exam1 |
| `<table>` | `border`, `cellpadding`, `cellspacing`, `<tr>`, `<th>`, `<td>` | Lab2, Exam1 |
| `<form>` | `action`, `target`, `onsubmit` | Lab3, Exam1 |
| `<input>` | `type="text/email/number/submit/checkbox"`, `required` | Lab3 |
| `<iframe>` | `src`, `width`, `height`, `allowfullscreen` | Lab2 |
| `<fieldset>` | Groups form fields | Lab3 |

### Exam1 Project — "Overlooked" (News Portal)
- Table-based layout for header, nav, content sections
- Multi-page site with navigation, contact form, about page
- YouTube embeds, comment forms on each news article

---

## 2. CSS

### Selectors
| Type | Example | Lab |
|------|---------|-----|
| Element | `div { }` | Lab5 |
| Class | `.box1 { }` | Lab5 |
| ID | `#heading { }` | Lab6 |
| Universal | `* { }` | Exam2 |
| Attribute | `input[type=email]` | Lab9 |
| Descendant | `.container h1` | Lab8 |
| Child | `li:first-child > a` | Lab8 |
| Adjacent Sibling | `p + h3` | Lab8 |

### Box Model
```
margin → border → padding → content
```
- `border: style width color; border-radius`
- `margin: auto` (center), `max-width`, `min-width`

### Layout Systems
| System | Properties | Lab |
|--------|-----------|-----|
| Flexbox | `display: flex; justify-content: center; align-items: center` | Lab6 |
| CSS Grid | `display: grid; grid-template-columns; grid-template-rows` | Lab9 |
| Float | `float: left/right` | Lab7, Lab8 |
| Positioning | `position: static/relative/absolute/fixed` | Lab7, Exam2 |

### Visual Effects
- `box-shadow`, `backdrop-filter: blur()` (glassmorphism)
- `background: linear-gradient()`, `background-size`, `background-attachment: fixed`
- `opacity`, `transition: opacity 0.2s`
- `border-radius: 50%` (circular images)

### Pseudo-classes & Pseudo-elements
- `:hover`, `:active`, `:visited`, `:link`, `:first-child` → Lab6, Lab8
- `::first-line`, `::first-letter`, `::before` → Lab8

### Responsive Design
- `@media only screen and (max-width: 600px/768px)`
- `@media only screen and (orientation: landscape)`
- Column hiding, font-size adjustments at breakpoints

### Lab Progression
| Lab | Topic |
|-----|-------|
| 5 | Box model, borders, padding, margin |
| 6 | Flexbox, tables, glassmorphism |
| 7 | Float, box-shadow, fixed positioning |
| 8 | Pseudo-elements, combinators |
| 9 | CSS Grid, media queries |
| 10 | Bootstrap 4 (navbar, grid) |
| Exam2 | Mini projects: tables, buttons, login forms |

---

## 3. Bootstrap

### Grid System
```html
<div class="container">
  <div class="row">
    <div class="col-lg-4 col-sm-12">...</div>
    <div class="col-lg-8 col-sm-12">...</div>
  </div>
</div>
```
- Breakpoints: `col-`, `col-sm-`, `col-md-`, `col-lg-`
- `.container-fluid` for full-width

### Components Used
| Component | Classes/Pattern | Lab |
|-----------|----------------|-----|
| Navbar | `.navbar .navbar-expand-lg .navbar-dark .bg-dark` | Exam3, Lab14 |
| Cards | `.card .card-body .card-title .card-text .card-img-top` | Exam3, Lab13 |
| Tables | `.table .table-striped .thead-dark` | Lab11 |
| Alerts | `.alert .alert-success/warning/danger` | Lab11 |
| Buttons | `.btn .btn-primary/success/outline-primary` | All |
| Badges | `.badge .badge-primary` | Lab12 |
| Progress Bars | `.progress .progress-bar .progress-bar-striped .progress-bar-animated` | Lab12 |
| Forms | `.form-group .form-control .form-check .form-range` | Lab15 |
| Modals | `data-toggle="modal" data-target="#myModal"` | Lab16 |
| Accordion | `#accordion .card .card-header` `data-toggle="collapse"` | Lab13 |
| Carousel | `.carousel .carousel-inner .carousel-item .carousel-caption` | Lab16 |
| Dropdowns | `.dropdown .dropdown-toggle .dropdown-menu .dropdown-item` | Lab13 |
| Pagination | `.pagination .page-item .page-link` | Lab12 |
| Breadcrumbs | `.breadcrumb .breadcrumb-item` | Lab12 |
| Tooltips | `data-toggle="tooltip" title="..."` | Lab16 |
| Nav pills | `.nav .nav-pills .nav-link.active` | Lab14 |

### Utilities
- Spacing: `m-*`, `p-*`, `mx-auto`, `my-*`
- Colors: `.bg-primary/dark/light/success/warning`, `.text-white/dark/muted`
- Display: `.d-flex`, `.d-block`, `.w-100`, `.img-fluid`, `.rounded-circle`, `.shadow`

---

## 4. JavaScript

### Fundamentals
- **Variables**: `var` (function-scoped), `let` (block-scoped), `const` (constant reference)
- **Data Types**: number, string, boolean, object, array, undefined, NaN
- **Operators**: `+`, `-`, `*`, `/`, `**`, `%`, `===`, `!==`, `&&`, `||`, ternary (`? :`)
- **Type Conversion**: `Number()`, `parseFloat()`, `parseInt()`, `String()`, implicit coercion

### Control Flow
```javascript
if (condition) { } else if { } else { }
switch(value) { case 1: break; default: }
for (let i = 0; i < arr.length; i++) { }
while (condition) { }
for (let x in obj) { }
```

### Functions
- Declaration: `function name(params) { }`
- Arrow: `const fn = (params) => { }`
- Callback: `.filter(item => item.price > 50)`, `.reduce((acc, item) => acc + item.score, 0)`
- Recursion: function calling itself with modified parameters

### Arrays
- `.push()`, `.filter()`, `.map()`, `.reduce()`, `.sort()`, `.join()`, `.length`
- `for` loop / `for...of` iteration

### Objects
- Literal: `{ key: value, method() { } }`
- Access: `obj.key`, `obj["key"]`
- `in` operator, `delete` operator, `this` keyword

### String Methods
- `.trim()`, `.toLowerCase()`, `.replace()`, `.split()`, `.indexOf()`, `.length`, `.match()`

### DOM Manipulation
```javascript
document.getElementById("id")
document.querySelector("selector")
element.innerHTML / .innerText / .style.property / .value
event.preventDefault()
```

### Events
- `onclick`, `onmouseover`, `onmouseout`, `oninput`
- `window.addEventListener('load', function(){ })`

### ES6+ Features
- **Template Literals**: `` `Hello ${name}` ``
- **Arrow Functions**: `() => { }`
- **Classes**: `class X { constructor() { } get prop() { } set prop(v) { } }`
- **Spread**: `Math.max(...arr)`

### Advanced
- **JSON**: `JSON.stringify()`, `JSON.parse()`
- **localStorage**: `setItem()`, `getItem()`
- **Error Handling**: `try { } catch(err) { }`
- **Regular Expressions**: `/pattern/flags`, `.test()`, `.match()`
- **Date**: `new Date()`, `.getFullYear()`, `.getMonth()`, `.getDate()`
- **setTimeout()**: delay function execution

### Lab Progression
| Lab | Topic |
|-----|-------|
| 18 | Objects with methods, `this` |
| 19 | String manipulation |
| 20 | Math object, type coercion |
| 21 | Ternary, `in`/`delete` |
| 22 | Arrays, filter/reduce/sort |
| 23 | Date object, age calc |
| 24 | while loops, switch/case |
| 25 | Regular expressions |
| 26 | JSON, try/catch |
| 27 | ES6 classes, getters/setters |
| 28 | DOM events, setTimeout |
| Problems | Recursion, dark mode, anagrams |
| Exam | Calculator + lottery ticket |

---

## 5. MySQL

### DDL (Data Definition Language)
```sql
CREATE DATABASE name;
USE name;
CREATE TABLE name ( col DATATYPE CONSTRAINTS, ... );
ALTER TABLE name ADD column_name DATATYPE AFTER existing_col;
DROP DATABASE name;
DROP TABLE name;
TRUNCATE TABLE name;
```

### Constraints
- `PRIMARY KEY`, `AUTO_INCREMENT`, `NOT NULL`, `UNIQUE`
- `FOREIGN KEY (col) REFERENCES other_table(col)`
- `INDEX (col)`

### DML (Data Manipulation Language)
```sql
INSERT INTO table (cols) VALUES (vals);
SELECT * FROM table WHERE condition;
UPDATE table SET col = value WHERE condition;
DELETE FROM table WHERE condition;
```

### Filtering
- `WHERE`, `AND`, `OR`, `IN (...)`, `BETWEEN ... AND ...`, `IS NULL`, `<>`, `LIKE`
- `DISTINCT`

### Aggregate Functions
```sql
COUNT(col), SUM(col), AVG(col), MIN(col), MAX(col)
GROUP BY col
HAVING condition  -- filter after GROUP BY
```

### Joins
```sql
INNER JOIN  -- only matching rows
LEFT JOIN   -- all from left, NULLs on right
RIGHT JOIN  -- all from right, NULLs on left
ON table1.col = table2.col
```

### Subqueries
```sql
WHERE col > (SELECT AVG(col) FROM table)
WHERE col IN (SELECT col FROM table)
WHERE col NOT IN (SELECT col FROM table)
```

### Others
- `UNION` — combine result sets
- `ORDER BY col DESC/ASC`
- `LIMIT n`
- `CONCAT(col1, ' ', col2) AS alias`
- Computed columns: `(price + price * 0.18) AS price_with_tax`
- `SHOW INDEX FROM table`

### Lab Progression
| Lab | Topic |
|-----|-------|
| 29 | SELECT, WHERE, IN, BETWEEN |
| 30 | DISTINCT, AND/OR, ORDER BY, computed columns |
| 31 | UPDATE, DELETE, TRUNCATE |
| 32 | MIN/MAX/SUM/AVG/COUNT, LIMIT |
| 33 | UNION, CONCAT, aliases |
| 34 | GROUP BY, HAVING, IS NULL, subqueries |
| 35 | ALTER TABLE, FOREIGN KEY, DROP DATABASE |
| 36 | LEFT/RIGHT/INNER JOIN |
| 37 | Many-to-many, UNIQUE, NOT NULL |
| 38 | INDEX, SHOW INDEX |

---

## 6. Java

### Basics
- **Class + main**: `public class X { public static void main(String[] args) { } }`
- **Scanner**: `Scanner input = new Scanner(System.in); input.nextLine()/nextInt()/nextDouble()`
- **Printf**: `System.out.printf("%d %f %s %n", intVal, doubleVal, strVal)`
- **Type Casting**: `(double) intVal`

### OOP Concepts
| Concept | Keyword | Lab |
|---------|---------|-----|
| Encapsulation | `private` fields + public getters/setters | Lab47 |
| Inheritance | `class Child extends Parent` | Lab46 |
| Abstraction | `abstract class X { abstract void method(); }` | Lab46 |
| Interfaces | `interface X { void method(); }` / `implements` | Lab45 |
| Polymorphism | Method overriding | Lab46 |
| Constructors | Default + parameterized, overloading | Lab48 |
| `this` keyword | Reference to current object | Lab47 |
| `static` | Class-level variable/method, shared across instances | Lab48 |
| `final` | Constant value, cannot be overridden | Lab48 |

### Packages
```java
package com.example;
import otherpackage.ClassName;
```
- Cross-package access with `import`

### Inner Classes
- **Non-static inner**: `outer.new InnerClass()`
- **Static nested**: `static class Inner { }` — accessed as `Outer.Inner`

### Arrays
```java
int[] arr = {1, 2, 3};
int[][] matrix = { {1,2}, {3,4} };
for (int i : arr) { }  // enhanced for-each
```

### Exception Handling
```java
try { riskyCode(); }
catch (Exception e) { e.getStackTrace(); }
```

### File I/O
```java
File file = new File("path");
file.createNewFile();
FileWriter writer = new FileWriter("path"); writer.write(data);
FileReader reader = new FileReader("path"); reader.read(charArray);
file.delete();
```

### Regular Expressions
```java
import java.util.regex.*;
Pattern p = Pattern.compile("\\b\\d{10}\\b");
Matcher m = p.matcher(text);
m.find() / m.matches() / m.group()
```

### Date/Time API
```java
LocalDateTime now = LocalDateTime.now();
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
now.format(fmt);
```

### Lab Progression
| Lab | Topic |
|-----|-------|
| 39 | Variables, arithmetic, type casting |
| 40 | Packages, cross-package access |
| 41 | String comparison, login logic |
| 42 | 1D + 2D arrays, nested loops |
| 43 | Enhanced for-each, break |
| 44 | Static nested classes, try-catch, Date/Time |
| 45 | Interfaces, multiple inheritance via interfaces |
| 46 | Abstract classes, method overriding |
| 47 | Encapsulation (private + getters/setters) |
| 48 | Constructors, static/final, inner classes |
| 49 | File I/O (create/write/read/delete) |
| 50 | Regular Expressions (Pattern/Matcher) |
| Exam | Pattern printing, multiplication table, ID lookup, calculator |

---

## 7. Spring Boot

### Project Structure (Maven)
```
src/main/java/com/example/
  |-- Application.java          (@SpringBootApplication)
  |-- Controller/               (@Controller, @RestController)
  |-- Service/                  (@Service)
  |-- Repository/               (JpaRepository interface)
  |-- Models/                   (@Entity)
  |-- dto/                      (Data Transfer Objects)
  |-- Configurations/           (@Configuration, SecurityConfig)
  `-- exception/                (@ControllerAdvice)
src/main/resources/
  |-- application.properties
  `-- templates/                (Thymeleaf .html)
pom.xml
```

### Annotations
| Annotation | Purpose |
|-----------|---------|
| `@SpringBootApplication` | Entry point, auto-config, component scan |
| `@Controller` | MVC controller (returns view names) |
| `@RestController` | RESTful controller (returns JSON) |
| `@GetMapping/@PostMapping` | HTTP method mapping |
| `@RequestMapping("/path")` | Class/URL-level mapping |
| `@PathVariable` | URL template variable |
| `@RequestParam` | Query string parameter |
| `@RequestBody` | JSON request body |
| `@ModelAttribute` | Form data to object binding |
| `@Valid` | Trigger validation |
| `@Autowired` | Dependency injection |
| `@Entity` | JPA entity |
| `@Id`, `@GeneratedValue` | Primary key |
| `@OneToMany`, `@ManyToOne` | Relationships |
| `@Query` | Custom JPQL |
| `@CrossOrigin` | CORS support |
| `@ControllerAdvice` | Global exception handler |

### Thymeleaf
```html
th:text, th:utext, th:if, th:unless, th:each
th:action, th:object, th:field, th:errors
th:fragment, th:replace (layout)
@{/url} (context path), ${variable}, *{selection}
```

### Spring Security
- `SecurityFilterChain` bean — configure HTTP security
- `BCryptPasswordEncoder` — password hashing
- `UserDetailsService` — database-backed authentication
- Form login: `loginPage()`, `loginProcessingUrl()`, `defaultSuccessUrl()`
- Token-based: `OncePerRequestFilter`, Bearer token parsing
- CSRF disable for APIs

### REST API Pattern
```
POST   /api/resource   → Create
GET    /api/resource   → Read all
GET    /api/resource/{id} → Read one
PUT    /api/resource/{id} → Update
DELETE /api/resource/{id} → Delete
GET    /api/search?keyword=... → Search
```

### JPA Repository
```java
public interface Repo extends JpaRepository<Entity, IdType> {
    List<Entity> findByField(String value);
    @Query("SELECT e FROM Entity e WHERE e.name LIKE %:kw%")
    List<Entity> search(@Param("kw") String keyword);
}
```

### Additional Features
- **File Upload**: `MultipartFile`, `Files.write()`, `enctype="multipart/form-data"`
- **Email**: `JavaMailSender`, `SimpleMailMessage`, Mailtrap SMTP
- **PDF**: Apache PDFBox / iText
- **DTO Pattern**: decouple API from entity models
- **Validation**: `@NotBlank`, `@Email`, `@Size`, custom `@Constraint`

### Lab Progression
| Lab | Topic |
|-----|-------|
| 51 | First Controller, @GetMapping |
| 52 | Static HTML pages |
| 53 | Model attributes, redirect |
| 54 | Model classes, th:each |
| 55 | Thymeleaf fragments (nav/footer) |
| 56 | Forms + custom validation |
| 57 | JPA Repositories |
| 58 | JPQL custom queries |
| 59 | Full CRUD MVC |
| 60 | DTO + Service layer |
| 61 | Spring Security (form login) |
| 62 | REST APIs |
| 63 | REST Registration |
| 64 | Token-based API auth |
| 65 | File Upload + Email + PDF |

---

## 8. React

### Component Basics
```jsx
function App() {
  const [state, setState] = useState(initial);
  useEffect(() => { }, [deps]);
  return <div>{state}</div>;
}
export default App;
```

### Hooks
| Hook | Purpose | Lab |
|------|---------|-----|
| `useState` | State management | 68 |
| `useEffect` | Side effects on mount/update/unmount | 69 |
| `useParams` | URL parameters from router | 70 |
| `useNavigate` | Programmatic navigation | 70 |
| `useSelector` | Read from Redux store | 74 |
| `useDispatch` | Dispatch actions to Redux store | 74 |
| `useMemo` | Memoized computed values | Main |
| `useCallback` | Memoized function references | Main |

### Props & Parent-Child
```jsx
// Parent passes
<Child isBright={isBright} toggleLight={toggleLight} />
// Child receives
function Child({ isBright, toggleLight }) {
  return <button onClick={toggleLight}>Toggle</button>;
}
```

### Conditional & List Rendering
```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

### Routing (react-router-dom)
```jsx
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: 'about', element: <About /> },
  { path: 'student/:name', element: <Profile /> },
]);
<RouterProvider router={router} />
<Link to="/about">About</Link>
const navigate = useNavigate(); navigate('/login');
```

### State Management
| Approach | Library | Lab |
|----------|---------|-----|
| Local state | `useState` | 68 |
| Props drilling | N/A | 68 |
| Redux Toolkit | `@reduxjs/toolkit` + `react-redux` | 74 |
| Zustand | `zustand` | Main |

**Redux Pattern:**
```js
const slice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => { state.user = action.payload; },
    removeUser: (state) => { state.user = null; },
  }
});
```

### CRUD Patterns (Local State)
```jsx
// Create
setItems([...items, newItem]);
// Update
setItems(items.map(item => item.id === id ? { ...item, name: newName } : item));
// Delete
setItems(items.filter(item => item.id !== id));
```

### REST API Integration
```jsx
// fetch
const res = await fetch(url); const data = await res.json();
// axios
axios.post(url, data).then(res => { }).catch(err => { });
```

### Protected Routes
```jsx
function ProtectedRoute({ children }) {
  const user = useSelector(store => store.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

### Authentication Flow
1. User registers (POST email/password)
2. User logs in → receives token
3. Token stored in Redux + localStorage
4. Axios sends `Authorization: Bearer {token}` header
5. ProtectedRoute checks Redux store before rendering

### Lab Progression
| Lab | Topic |
|-----|-------|
| 66 | JSX, variables, images |
| 67 | Lists, events, conditionals |
| 68 | useState, props, child components |
| 69 | useEffect |
| 70 | React Router |
| 71 | Local CRUD |
| 72 | REST API with fetch |
| 73 | Auth with axios |
| 74 | Redux Toolkit, protected routes |
| 75 | json-server mock backend |
| Main | Zustand, URL shortener (Ziplink) |

---

## Quick Reference: Tech Stack Flow

```
HTML        → Structure
CSS/Bootstrap → Styling & Layout
JavaScript  → Client-side logic & DOM
MySQL       → Database (SQL)
Java        → Backend language (OOP)
Spring Boot → Framework (MVC, REST, Security, JPA)
React       → Frontend framework (SPA)
```

**Full Stack Flow:**
```
React (UI) → Spring Boot REST API (Backend) → JPA Repository → MySQL Database
                         <=>
              Spring Security (Auth + Tokens)
```
