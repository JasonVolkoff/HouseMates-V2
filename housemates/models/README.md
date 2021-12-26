# HouseMates model conventions

## General

-   Each model must have its own file and each file should only contain one model.

## Base models

-   Base model files must begin with `base_` followed by the rest of the name.

## Naming conventions

Follow all standard pep8 naming practices as normal with exception/addition to the following:

-   The name of the file should also be the "snake case" name of the "pascal case" class inside
-   -   ex: `taco_type.py` would have a class called `TacoType()`
-   -   NEVER plural: `taco_types.py` -> `TacoTypes()`
