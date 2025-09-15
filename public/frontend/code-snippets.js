/**
 * Code Snippets Module
 * Contains code examples for different programming languages
 */

// Code templates for different programming languages
const CODE_SNIPPETS = {
    ruby: `# Ruby code example
class Person
  attr_accessor :name, :age
  
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def greet
    puts "Hello, my name is #{@name} and I am #{@age} years old."
  end
end

person = Person.new("John Doe", 30)
person.greet`,

    javascript: `// JavaScript code example
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(\`Hello, my name is \${this.name} and I am \${this.age} years old.\`);
  }
}

const person = new Person("John Doe", 30);
person.greet();`,

    typescript: `// TypeScript code example
interface PersonInterface {
  name: string;
  age: number;
  greet(): void;
}

class Person implements PersonInterface {
  constructor(public name: string, public age: number) {}
  
  greet(): void {
    console.log(\`Hello, my name is \${this.name} and I am \${this.age} years old.\`);
  }
}

const person: Person = new Person("John Doe", 30);
person.greet();`,

    go: `// Go code example
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() {
    fmt.Printf("Hello, my name is %s and I am %d years old.\\n", p.Name, p.Age)
}

func main() {
    person := Person{Name: "John Doe", Age: 30}
    person.Greet()
}`,

    c: `/* C code example */
#include <stdio.h>
#include <string.h>

struct Person {
    char name[50];
    int age;
};

void greet(struct Person *person) {
    printf("Hello, my name is %s and I am %d years old.\\n", 
           person->name, person->age);
}

int main() {
    struct Person person = {"John Doe", 30};
    greet(&person);
    return 0;
}`,

    cpp: `// C++ code example
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;

public:
    Person(const std::string& name, int age) : name(name), age(age) {}
    
    void greet() const {
        std::cout << "Hello, my name is " << name 
                  << " and I am " << age << " years old." << std::endl;
    }
};

int main() {
    Person person("John Doe", 30);
    person.greet();
    return 0;
}`,

    python: `# Python code example
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")

person = Person("John Doe", 30)
person.greet()`,

    java: `// Java code example
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void greet() {
        System.out.println("Hello, my name is " + name + 
                          " and I am " + age + " years old.");
    }
    
    public static void main(String[] args) {
        Person person = new Person("John Doe", 30);
        person.greet();
    }
}`
};

// Export for browser
if (typeof window !== 'undefined') {
    window.CODE_SNIPPETS = CODE_SNIPPETS;
}
