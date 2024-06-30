const app = require('../../server.js');
const request = require('supertest');
 
describe('Teste para criar projeto', () => {
 
    test('POST /api/v1/project (ISSO DEVE CRIAR UM PROJETO))', async () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5NDQyNTQyLCJleHAiOjE3MTk0NDYxNDJ9.5DEyN3bdaPAO4p98VnDB8XhRp0X0k38T2Z8WoUPIYmI'
        const response = await request(app)
            .post('/api/v1/project/')
            .set('Cookie', `token=${token};  userId=1`)
            .send({
                nome:"Renan",
                descricao:"teste123@teste"
            }); 
            console.log(response.body)
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body.nome).toBe("Renan");
            expect(response.body.descricao).toBe("teste123@teste");
    })

    test('DELETE /api/v1/project/:id (ISSO DEVE DELETAR UM PROJETO))', async () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5NDQyNTQyLCJleHAiOjE3MTk0NDYxNDJ9.5DEyN3bdaPAO4p98VnDB8XhRp0X0k38T2Z8WoUPIYmI'
        const response = await request(app)
            .delete('/api/v1/project/:id')
            .set('Cookie', `token=${token};  userId=1`)
            .send({
                nome:"id"
            });
            console.log(response.body)
            expect(response.statusCode).toBe(202);
            expect(response.body).toHaveProperty("id");
    })
})