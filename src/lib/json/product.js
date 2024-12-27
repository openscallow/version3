// import { Images } from "lucide-svelte";

export let productDatabase ={
    0:{
        img: "https://m.media-amazon.com/images/I/81VadRn+t-L._SX679_.jpg",
        company: "Kangaro",
        name: "kangaro stapler no.10",
        description: "This stapler features an all-steel construction with a built-in staple remover and reload indicator. It uses No.10 staples, with a loading capacity of 50 staples and can staple up to 20 sheets of 75-80 gsm paper. The stapler has a 52mm throat depth, is manually loaded, supports conventional stapling, and includes a tacking function.",
        currentPrice: 70,
        previousPrice: 75,
        id:0,
        images: ["https://m.media-amazon.com/images/I/81VadRn+t-L._SX679_.jpg", "https://m.media-amazon.com/images/I/A14hDXFRp0L._SX355_.jpg"]
    },  
    1:{
        img: "https://m.media-amazon.com/images/I/51DeDlq-imL.jpg",
        company: "Kangaro",
        name: "kangaro Staple Pin no.10",
        description: "Package includes 1 packs of Kangaro NO. 10-1M heavy-duty, zinc-coated, rust-resistant steel staple pins (1000 pins each), durable and long-lasting for efficient and error-free usage.",
        currentPrice: 5,
        previousPrice: 10,
        id:1,
        images: ["https://m.media-amazon.com/images/I/51DeDlq-imL.jpg"]
    },
    2:{
        img: "https://m.media-amazon.com/images/I/61imoDGpnxL._SY355_.jpg",
        company: "Kangaro",
        name: "faber castell highlighter [yellow]",
        description: "Super fluorescent highlighter with longer writing length, a special non-porous polypropylene body for extended shelf life, uniform ink flow from unique ink injection technology, washable non-toxic ink, a pocket clip for easy carrying, and available in five colors: yellow, pink, green, orange, and blue.",
        currentPrice: 20,
        previousPrice: 25,
        id:2,
        images: ["https://m.media-amazon.com/images/I/61imoDGpnxL._SY355_.jpg"]
    },
    3:{
        img: "https://m.media-amazon.com/images/I/41SEuM4iUPL._SY450_.jpg",
        company: "Cello",
        name: "Cello Gripper Ball Pen [Blue]",
        description: "Cello Blue Polycarbonate Ballpoint Pen, Transparent.",
        currentPrice: 9,
        previousPrice: 10,
        id:3,
        images: ["https://m.media-amazon.com/images/I/41SEuM4iUPL._SY450_.jpg"]
    },
    4:{
        img: "https://m.media-amazon.com/images/I/81bv2pWZh1L._SY450_.jpg",
        company: "Cello",
        name: "Cello Gripper Ball Pen, Pack of 5 [Blue]",
        description: "Cello Blue Polycarbonate Ballpoint Pen, Transparent.",
        currentPrice: 45,
        previousPrice: 50,
        id:4,
        images: ["https://m.media-amazon.com/images/I/81bv2pWZh1L._SY450_.jpg"]
    },
    5:{
        img: "https://m.media-amazon.com/images/I/71s5w4CzntL._SY450_.jpg",
        company: "Saino softek",
        name: "Saino softek Pen [Blue]",
        description: "Saino Softek Ballpoint Pen, Blue ink, suitable for adults. Available in extra fine and fine point types.",
        currentPrice: 3,
        previousPrice: 5,
        id:5,
        images: ["https://m.media-amazon.com/images/I/71s5w4CzntL._SY450_.jpg"]
    },
    6:{
        img: "https://m.media-amazon.com/images/I/61ztN-eSVlL._SY355_.jpg",
        company: "Saino softek",
        name: "Saino softek Pen, pack of 12 [Blue]",
        description: "Saino Softek Ballpoint Pen, Blue ink, suitable for adults. Available in extra fine and fine point types.",
        currentPrice: 48,
        previousPrice: 60,
        id:6,
        images: ["https://m.media-amazon.com/images/I/61ztN-eSVlL._SY355_.jpg"]
    },
    7:{
        img: "https://m.media-amazon.com/images/I/31qyEuA+uWL._SY355_.jpg",
        company: "Doms",
        name: "Doms Erasener Eraser and Sharpener [Yellow]",
        description: "Generic Plastic, Portable, ideal for Artists, Teachers, and Students. Manufactured by Doms.",
        currentPrice: 10,
        previousPrice: 15,
        id:7,
        images: ["https://m.media-amazon.com/images/I/31qyEuA+uWL._SY355_.jpg"]
    },
    8:{
        img: "https://m.media-amazon.com/images/I/51B8qqUlIhS._SX425_.jpg",
        company: "Doms",
        name: "Doms 15cm Transparent Scale",
        description: "Generic Plastic, Portable, ideal for Artists, Teachers, and Students. Manufactured by Doms.",
        currentPrice: 4,
        previousPrice: 5,
        id:8,
        images: ["https://m.media-amazon.com/images/I/51B8qqUlIhS._SX425_.jpg"]
    },
    9:{
        img: "https://m.media-amazon.com/images/I/81i88ah80oL._SX569_.jpg",
        company: "Saino softek",
        name: "Saino softek Pen [Black]",
        description: "Generic Plastic, Portable, ideal for Artists, Teachers, and Students. Manufactured by Doms.",
        currentPrice:   4,
        previousPrice: 5,
        id:9,
        images: ["https://m.media-amazon.com/images/I/81i88ah80oL._SX569_.jpg"]
    },
    10:{
        img: "https://i0.wp.com/sbcstore.in/wp-content/uploads/2022/07/61mXKuJ9VvL._SL1500_.jpg?resize=600%2C400&ssl=1",
        company: "Bambalio",
        name: "Sticky Note Sheets [Yellow]",
        description: "Add variety and personality to your note with this 2x3 inch, 100-sheet pack.",
        currentPrice:   30,
        previousPrice: 35,
        id:10,
        images: ["https://i0.wp.com/sbcstore.in/wp-content/uploads/2022/07/61mXKuJ9VvL._SL1500_.jpg?resize=600%2C400&ssl=1"]
    },
    11:{
        img: "https://m.media-amazon.com/images/I/81GzA22HjdL._SY450_.jpg",
        company: "Classmate",
        name: "Classmate Notebook [172 Pages]",
        description: "A high-quality ruled notebook, ideal for students and professionals alike.",
        currentPrice: 55,
        previousPrice: 60,
        id: 11,
        images: ["https://m.media-amazon.com/images/I/81GzA22HjdL._SY450_.jpg"]
    },
    12:{
        img: "https://m.media-amazon.com/images/I/71WcwtLvJfL._SY355_.jpg",
        company: "Camlin",
        name: "Camlin Geometry Box | કંપાસ બોક્સ",
        description: "Complete geometry set with ruler, compass, protractor, and more, suitable for all age groups.",
        currentPrice: 120,
        previousPrice: 140,
        id: 12,
        images: ["https://m.media-amazon.com/images/I/71WcwtLvJfL._SY355_.jpg"]
    },
    13:{
        img: "https://m.media-amazon.com/images/I/61dSXSk80+L._SY355_.jpg",
        company: "Apsara",
        name: "Apsara Platinum Extra Dark Pencils",
        description: "Pack of 1 extra dark pencils, ideal for writing and sketching.",
        currentPrice: 5,
        previousPrice: 6,
        id: 13,
        images: ["https://m.media-amazon.com/images/I/61dSXSk80+L._SY355_.jpg"]
    },
    14:{
        img: "https://m.media-amazon.com/images/I/61XfAo84D+L._SY450_.jpg",
        company: "Apsara",
        name: "Apsara Platinum Extra Dark Pencils [Pack of 10]",
        description: "Pack of 10 extra dark pencils, ideal for writing and sketching.",
        currentPrice: 60,
        previousPrice: 70,
        id: 14,
        images: ["https://m.media-amazon.com/images/I/61XfAo84D+L._SY450_.jpg"]
    },
    15:{
        img: "https://m.media-amazon.com/images/I/61oPdzZOAXL._SY450_.jpg",
        company: "Cello",
        name: "Cello Whiteboard Marker [Pack of 4]",
        description: "Set of 4 whiteboard markers in assorted colors, suitable for office and educational use.",
        currentPrice: 90,
        previousPrice: 100,
        id: 15,
        images: ["https://m.media-amazon.com/images/I/61oPdzZOAXL._SY450_.jpg"]
    },
    16:{
        img: "https://m.media-amazon.com/images/I/71-uxbQrlcL._SY450_.jpg",
        company: "Faber-Castell",
        name: "Faber-Castell Oil Pastels [15 Shades]",
        description: "Pack of 15 oil pastels in vibrant colors, perfect for artistic projects.",
        currentPrice: 60,
        previousPrice: 70,
        id: 16,
        images: ["https://m.media-amazon.com/images/I/71-uxbQrlcL._SY450_.jpg"]
    },
    17:{
        img: "https://m.media-amazon.com/images/I/31aFafrbBKL._SY445_.jpg",
        company: "Pidilite",
        name: "Fevicol MR [20 g]",
        description: "A large 20 g bottle of Fevicol MR, a multipurpose adhesive for all craft projects.",
        currentPrice: 10,
        previousPrice: 10,
        id: 17,
        images: ["https://m.media-amazon.com/images/I/31aFafrbBKL._SY445_.jpg"]
    },
    18:{
        img: "https://m.media-amazon.com/images/I/61ctE6kAXWL._SY355_.jpg",
        company: "Classmate",
        name: "Classmate Premium Spiral Notebook",
        description: "A 200-page spiral-bound notebook with a durable cover, perfect for notes and journaling.",
        currentPrice: 80,
        previousPrice: 100,
        id: 18,
        images: ["https://m.media-amazon.com/images/I/61ctE6kAXWL._SY355_.jpg"]
    },
    19:{
        img: "https://m.media-amazon.com/images/I/61WZK+0yiaL._SX522_.jpg",
        company: "Nataraj",
        name: "Nataraj Geometry Box",
        description: "A comprehensive geometry box with all essential tools for precise measurements.",
        currentPrice: 140,
        previousPrice: 160,
        id: 19,
        images: ["https://m.media-amazon.com/images/I/61WZK+0yiaL._SX522_.jpg"]
    },
    20:{
        img: "https://m.media-amazon.com/images/I/61l7hpuuoTL._SY450_.jpg",
        company: "Luxor",
        name: "Luxor Gel Pen ",
        description: "A gel pens, perfect for everyday use.",
        currentPrice: 25,
        previousPrice: 30,
        id: 20,
        images: ["https://m.media-amazon.com/images/I/61l7hpuuoTL._SY450_.jpg"]
    },
    21:{
        img: "https://m.media-amazon.com/images/I/715KSZ8WJKL._SY355_.jpg",
        company: "Luxor",
        name: "Luxor Gel Pen [Pack of 4]",
        description: "A set of 4 smooth-writing gel pens, perfect for everyday use.",
        currentPrice: 100,
        previousPrice: 120,
        id: 21,
        images: ["https://m.media-amazon.com/images/I/715KSZ8WJKL._SY355_.jpg"]
    },
    22:{
        img: "https://m.media-amazon.com/images/I/71iWi+0I8UL._SX679_.jpg",
        company: "Kangaro",
        name: "Kangaro Punching Machine",
        description: "A compact punching machine, ideal for office and school document management.",
        currentPrice: 170,
        previousPrice: 225,
        id: 22,
        images: ["https://m.media-amazon.com/images/I/71iWi+0I8UL._SX679_.jpg"]
    },
    23:{
        img: "https://m.media-amazon.com/images/I/61vmh8FcZ5L._SY450_.jpg",
        company: "Yajnas",
        name: "Yajnas Whiteboard Duster",
        description: "A lightweight whiteboard duster, perfect for clean erasing.",
        currentPrice: 160,
        previousPrice: 1000,
        id: 23,
        images: ["https://m.media-amazon.com/images/I/61vmh8FcZ5L._SY450_.jpg"]
    },
    24:{
        img: "https://m.media-amazon.com/images/I/51nn+Lt+8kL._SL1000_.jpg",
        company: "Pidilite",
        name: "Fevistik Glue Stick",
        description: "a glue sticks, ideal for paper crafting and sticking.",
        currentPrice: 9,
        previousPrice: 10,
        id: 24,
        images: ["https://m.media-amazon.com/images/I/51nn+Lt+8kL._SL1000_.jpg"]
    },
    25:{
        img: "https://m.media-amazon.com/images/I/51etxLIWodL._SY355_.jpg",
        company: "Cello",
        name: "Cello Butterflow Ball Pen",
        description: "A smooth-writing ballpoint pens, ideal for everyday use.",
        currentPrice: 8,
        previousPrice: 10,
        id: 25,
        images: ["https://m.media-amazon.com/images/I/51etxLIWodL._SY355_.jpg"]
    },
    26:{
        img: "https://m.media-amazon.com/images/I/51TV+K+PloL._SY300_SX300_.jpg",
        company: "Cello",
        name: "Cello Butterflow Ball Pen [Pack of 5]",
        description: "A set of 5 smooth-writing ballpoint pens, ideal for everyday use.",
        currentPrice: 50,
        previousPrice: 45,
        id: 26,
        images: ["https://m.media-amazon.com/images/I/51TV+K+PloL._SY300_SX300_.jpg"]
    },
    27:{
        img: "https://m.media-amazon.com/images/I/51jNezlRY1L.jpg",
        company: "Classmate",
        name: "Classmate Drawing Book",
        description: "A 40-page drawing book, ideal for sketching and creative projects.",
        currentPrice: 40,
        previousPrice: 50,
        id: 27,
        images: ["https://m.media-amazon.com/images/I/51jNezlRY1L.jpg"]
    },
    28:{
        img: "https://m.media-amazon.com/images/I/81I0oQ-F5NL._SX679_.jpg",
        company: "Art Ranger",
        name: "Cylendrical Desk Pen, Pencil, Stationery Holder",
        description: "The Art Ranger Pen & Pencil Holder is a lightweight, polished metal organizer ideal for office, home, or study tables. Its compact, round design and black finish make it both functional and stylish for organizing essentials.",
        currentPrice: 99,
        previousPrice: 100,
        id: 28,
        images: ["https://m.media-amazon.com/images/I/81I0oQ-F5NL._SX679_.jpg", "https://m.media-amazon.com/images/I/81Tg5uPDqCL._SX679_.jpg"]
    },
    29:{
        img: "https://m.media-amazon.com/images/I/41duozgs09S._SX300_SY300_QL70_FMwebp_.jpg",
        company: "Doms",
        name: "Doms X1 Premium Mathematical Drawing Instrument Box | કંપાસ બોક્સ",
        description: "1 Compass, 1 Divider Arm, 1 Set Square 45degree, 1 Set Square 60degree, 1 Scale (15cm), 1 Eraser, 1 Sharpener, 1 (0.5) Mechanical Pencil, 1 Protractor 180degree, 1 Stencil | Set of 10 Instruments",
        currentPrice: 145,
        previousPrice: 150,
        id: 29,
        images: ["https://m.media-amazon.com/images/I/41duozgs09S._SX300_SY300_QL70_FMwebp_.jpg", "https://m.media-amazon.com/images/I/71A0y+1ueeS._SX522_.jpg"]
    },
    30:{
        img: "https://m.media-amazon.com/images/I/71tPPYHHMqL._SX522_.jpg",
        company: "Cello",
        name: "Cello Arc 0.7Mm Mechanical Pencil | કાકરા પેન્સિલ",
        description: "One machenical lead pen and one pack of lead worth 5 rupees",
        currentPrice: 19,
        previousPrice: 20,
        id: 30,
        images: ["https://m.media-amazon.com/images/I/71tPPYHHMqL._SX522_.jpg", "https://m.media-amazon.com/images/I/51Kx422hEFL._SX522_.jpg"]
    },
    31:{
        img: "https://m.media-amazon.com/images/I/51BNTW4IL2L._SX300_SY300_QL70_FMwebp_.jpg",
        company: "Camlin ",
        name: "Camlin Lead Hb (0.7 Mm,Pack Of 30 Leads)| કાકરા પેન્સિલ",
        description: "Camlin Kokuyo Ltd. 0.7mm black ink pen, made of plastic, suitable for toddlers.",
        currentPrice: 145,
        previousPrice: 150,
        id: 31,
        images: ["https://m.media-amazon.com/images/I/71455qPeS8L._SX522_.jpg"]
    },

    32:{
        img: "https://rukminim2.flixcart.com/image/1150/1350/k4k7f680/desk-organizer/e/c/h/1727c-pen-pencil-holder-elite-clear-colour-omega-original-imafng2vftcutpht.jpeg",
        company: "KHYATI",
        name: "4 Compartments Plastic Pen/Pencil Holder | પેન હોલ્ડર",
        description: "Includes a pen/pencil holder with space for pens, cards, pins/clips; weighs 245g.",
        currentPrice: 149,
        previousPrice: 185,
        id: 32,
        images: ["https://rukminim2.flixcart.com/image/1150/1350/k4k7f680/desk-organizer/e/c/h/1727c-pen-pencil-holder-elite-clear-colour-omega-original-imafng2vftcutpht.jpeg", "https://rukminim1.flixcart.com/image/776/931/koq33ww0/desk-organizer/r/7/u/elite-pen-stand-s625-1-elite-pen-stand-khyati-original-imag34k3hzykcq3n.jpeg"]
    },

    33:{
        img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTU7PolyNY5VwE9oDzELax_GscFMfGBsBhvQssBczkDP4ZtwQoK1-qA8ywRaPXvnmabvnoWUSacsmmypRx_j3Bm1Xzls-MdfkUmfTm-RKFFj7noEDw5fmxe1A",
        company: "Classmate",
        name: "Classmate Graph Book 32 Pages | ગ્રાફ બુક",
        description: "The Classmate Graph Book (32 pages) is a high-quality graphing notebook designed for academic and professional use",
        currentPrice: 20,
        previousPrice: 22,
        id: 33,
        images: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTU7PolyNY5VwE9oDzELax_GscFMfGBsBhvQssBczkDP4ZtwQoK1-qA8ywRaPXvnmabvnoWUSacsmmypRx_j3Bm1Xzls-MdfkUmfTm-RKFFj7noEDw5fmxe1A", "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQqvpLw6Ei9-1lzxHeN30Ve82Rzlc3h0e4aFSAe1q2RhvMqpJSZgVEZg-aBeXOXByZtffpufjr6x5wWPykFfrYT26dVa9m9Mx0Nt1TT6jykBVoo6LZlBG19", "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRXKpK3YpEHhUbA-oiijfIGLdOnjFVY7pixQuBD8P_QS63O3IvgeWNM54gO56K1uk4lI6NJjChff1EjdHIGbDDPgsXaoUUiWGb8x0ZRG1HXs6pmsuvY6hxk"]
    }

    
  }