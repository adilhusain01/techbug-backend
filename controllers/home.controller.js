export const getCard = (req,res)=>{
    const data = [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "phone": "555-1234",
          "role": "admin",
          "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "state": "Anystate",
            "zip": "12345"
          }
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "phone": "555-5678",
          "role": "user",
          "address": {
            "street": "456 Oak St",
            "city": "Othertown",
            "state": "Otherstate",
            "zip": "67890"
          }
        },
        {
          "id": 3,
          "name": "Jim Brown",
          "email": "jim.brown@example.com",
          "phone": "555-8765",
          "role": "user",
          "address": {
            "street": "789 Pine St",
            "city": "Elsewhere",
            "state": "ElsewhereState",
            "zip": "54321"
          }
        },
        {
          "id": 4,
          "name": "Sara White",
          "email": "sara.white@example.com",
          "phone": "555-4321",
          "role": "moderator",
          "address": {
            "street": "321 Elm St",
            "city": "Sometown",
            "state": "SometownState",
            "zip": "11223"
          }
        }
      ]
      
    res.send(data);
}

export const getTestimonial = (req,res)=>{
    const data = [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "phone": "555-1234",
          "role": "admin",
          "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "state": "Anystate",
            "zip": "12345"
          }
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "phone": "555-5678",
          "role": "user",
          "address": {
            "street": "456 Oak St",
            "city": "Othertown",
            "state": "Otherstate",
            "zip": "67890"
          }
        },
        {
          "id": 3,
          "name": "Jim Brown",
          "email": "jim.brown@example.com",
          "phone": "555-8765",
          "role": "user",
          "address": {
            "street": "789 Pine St",
            "city": "Elsewhere",
            "state": "ElsewhereState",
            "zip": "54321"
          }
        },
        {
          "id": 4,
          "name": "Sara White",
          "email": "sara.white@example.com",
          "phone": "555-4321",
          "role": "moderator",
          "address": {
            "street": "321 Elm St",
            "city": "Sometown",
            "state": "SometownState",
            "zip": "11223"
          }
        }
      ]
      
    res.send(data);
}