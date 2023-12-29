import { faker } from '@faker-js/faker';
import {
  InsertCampus,
  InsertFacility,
  InsertHouseType,
} from './libs/api/database/src';

const AUTH_HEADER = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJsYW5kbG9yZCIsImlhdCI6MTcwMzcwNTIwMiwiZXhwIjoxNzAzNzA4ODAyfQ.0uCiTICvRBqkwFGc3BhbOyzfeBPb2PypcFzS61R6rAY',
};

const HOUSE_TYPES = ['套房', '雅房', '家庭式'];
const CAMPUSES = [
  '自強校區',
  '勝利校區',
  '成功校區',
  '光復校區',
  '力行校區',
  '成杏校區',
  '敬業校區',
  '東寧校區',
];

const FACILITIES = [
  '網路',
  '冰箱',
  '電視',
  '洗衣機',
  '冷氣',
  '電熱水器',
  '飲水機',
];

const STUDENT_COUNT = 30;
const LANDLORD_COUNT = 10;
const ADMIN_COUNT = 1;
const RENTING_COUNT = 100;
async function main() {
  console.log('Seeding starts');
  await seedHouseType(HOUSE_TYPES);
  await seedCampus(CAMPUSES);
  await seedFacility(FACILITIES);
  await seedLandlord(LANDLORD_COUNT);
  await seedStudent(STUDENT_COUNT);
  await seedAdmin(ADMIN_COUNT);
  await seedRentings(RENTING_COUNT);
  await console.log('Seeding completes');
}

async function seedHouseType(houseTypes: string[]) {
  console.log('Seeding house types...');
  for (let i = 0; i < houseTypes.length; i++) {
    const payload: InsertHouseType = {
      name: houseTypes[i],
    };
    const res = await fetch('http://localhost:3000/house-type', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AUTH_HEADER,
      },
    });
  }
  console.log('Seeding house types completed');
}

async function seedCampus(campuses: string[]) {
  console.log('Seeding campuses...');
  for (let i = 0; i < campuses.length; i++) {
    const payload: InsertCampus = {
      name: campuses[i],
    };
    const res = await fetch('http://localhost:3000/campus', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AUTH_HEADER,
      },
    });
  }

  console.log('Seeding campuses completed');
}

async function seedFacility(facilities: string[]) {
  console.log('Seeding facilities...');
  for (let i = 0; i < facilities.length; i++) {
    const payload: InsertFacility = {
      name: facilities[i],
      icon: 'icon.icon',
    };
    const res = await fetch('http://localhost:3000/facilities', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AUTH_HEADER,
      },
    });
  }

  console.log('Seeding facilities completed');
}

async function seedStudent(count: number) {
  console.log('Seeding students...');
  for (let i = 1; i <= count; i++) {
    const payload = {
      name: faker.person.firstName(),
      phone: faker.string.numeric(8),
      studentNumber: 'd1234' + pad(i),
      password: '123456',
    };
    const res = await fetch('http://localhost:3000/auth/register-student', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AUTH_HEADER,
      },
    });
  }

  console.log('Seeding students completed');
}

async function seedLandlord(count: number) {
  console.log('Seeding landlords...');
  for (let i = 1; i <= count; i++) {
    const payload = {
      name: faker.person.firstName(),
      phone: faker.string.numeric(8),
      email: faker.internet.email(),
      password: '123456',
    };
    const res = await fetch('http://localhost:3000/auth/register-landlord', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AUTH_HEADER,
      },
    });
  }

  console.log('Seeding landlords completed');
}

async function seedAdmin(count) {
  console.log('Seeding admin...');
  for (let i = 1; i <= count; i++) {
    const payload = {
      name: faker.person.firstName(),
      phone: faker.string.numeric(8),
      email: 'admin@gmail.com',
      password: '123456',
    };
    const res = await fetch('http://localhost:3000/auth/register-admin', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AUTH_HEADER,
      },
    });
  }

  console.log('Seeding admin completed');
}

async function seedRentings(count) {
  console.log('Seeding rentings...');
  for (let i = 1; i <= count; i++) {
    const payload = {
      title: faker.word.noun(5),
      description: faker.word.noun(7),
      houseTypeId: 1 + (i % HOUSE_TYPES.length),
      campusId: 1 + (i % CAMPUSES.length),
      address: faker.location.streetAddress(),
      price: faker.number.int({ min: 3000, max: 10000 }),
      square: faker.number.int({ min: 5, max: 50 }),
      floor: faker.number.int({ min: 1, max: 3 }),
      totalFloor: faker.number.int({ min: 3, max: 10 }),
      images: [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ],
      features: [Math.random() > 0.5 ? '可養寵物' : '免管理費'],
      rules: [Math.random() > 0.7 ? '不可合租' : '禁止明火'],
      facilityIds: faker.helpers.arrayElements([1, 2, 3, 4, 5, 6, 7], {
        min: 4,
        max: 7,
      }),
    };
    const res = await fetch('http://localhost:3000/rentings', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AUTH_HEADER,
      },
    });

    console.log(res);
  }

  console.log('Seeding rentings completed');
}
// utilities

function pad(num: number) {
  const str = '' + num;
  const pad = '0000';
  const ans = pad.substring(0, pad.length - str.length) + str;
  return ans;
}

main();
