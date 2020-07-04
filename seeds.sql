INSERT INTO department (name)
VALUES ('sales') , ('Engineering') , ('legal') ,('finance');

INSERT INTO duty (title , salary , department_id)
VALUES ("Sales lead", "100000" , 1), ("Salesperson", "80000" , 1), ("Lead Engineer", "190000" , 2), ("Software Engineer", "190000" , 2), ("Accountant", "125000" , 3), ("Legal Team Lead", "250000" , 4)  ,("Lawyer", "190000" , 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ( "John", "Doe", 5, 12),
		( "Mike", "Chan", 6, 13),
        ( "Ashley", "Rodriguez", 7, null),
        ( "Kevin", "Tupik", 8, 12),
        ( "Malia", "Brown", 9, null),
        ( "Sarah", "Lourd", 10, null),
          ( "Tom", "Allen", 11, 14);
        