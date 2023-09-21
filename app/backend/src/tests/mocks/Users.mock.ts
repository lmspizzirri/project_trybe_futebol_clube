const validUserInput = {
    email: 'test@trybe.com',
    password:  '123456',
}

const noEmailInput = {
    email: '',
    password: '123456'
}

const invalidEmailInput = {
    email: 'test',
    password: '123456'
}
const noPasswordInput = {
    email: 'test@trybe.com',
    password: '123456'
}

const invalidPasswordInput =  {
    email: 'test@trybe.com',
    password: '123'
}

const validUserReturn = {
    id: 1,
    username: 'Wilson',
    role: 'Ball',
    email: 'wilson@trybe.com',
    password: '123456'
}

export default { invalidEmailInput, invalidPasswordInput, noEmailInput, noPasswordInput, validUserInput, validUserReturn };
