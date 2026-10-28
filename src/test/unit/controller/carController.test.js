
const carsController = require('../../src/controller/carsController');
const carsService = require('../../src/services/carsServices');

jest.mock('../../src/services/carsServices');

describe('CarsController - aracEkle Unit Testi', () => {
  it('gelen veriyi userID ile birleştirip servise göndermeli ve 201 dönmeli', async () => {
    
    const req = {
      body: { marka: 'Fiat', model: 'Linea' },
      user: { userId: 5 } 
    };

    const res = {

      status: jest.fn().mockReturnThis(), 
      json: jest.fn()
    };
    
    const next = jest.fn();

    const sahteDonenArac = { id: 1, marka: 'Fiat', model: 'Linea', userID: 5 };
    carsService.aracEkle.mockResolvedValue(sahteDonenArac);
   
    await carsController.aracEkle(req, res, next);
 
    expect(carsService.aracEkle).toHaveBeenCalledWith({
      marka: 'Fiat',
      model: 'Linea',
      userID: 5
    });

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      mesaj: 'Araç oluşturuldu.',
      arac: sahteDonenArac
    });
  });
});