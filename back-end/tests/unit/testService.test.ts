import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

describe("service insert", () => {
    it('insert...', () => {
        const data = { name: "fds", youtubeLink: "fdwai" }
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(():any => false);
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((value):any => expect(value).toEqual(data));
        recommendationService.insert(data);

    });
    it('insert duplicated...', () => {
        const data = { name: "fds", youtubeLink: "fdwai", score: 1 }
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(():any => true);
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((data):any => data);
        const promise = recommendationService.insert(data);
        expect(promise).rejects.toEqual({ type: "conflict", message: "Recommendations names must be unique"});
    });
})
describe("service vote", () => {
    it('downvote...', async () => {
        const id = 1;
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((num):any => num === id? true : false);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((num, opt):any => {
            expect(num).toEqual(id);
            expect(opt).toEqual("decrement");
            return {score: -7};
        });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((num):any => {});
        await recommendationService.downvote(id);
        expect(recommendationRepository.remove).toBeCalledTimes(1);
    });      
    it('upvote...', () => {
        const id = 1;
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((num):any => num === id? true : false);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((num, opt):any => {
            expect(num).toEqual(id);
            expect(opt).toEqual("increment");
        });
        recommendationService.upvote(id);
    });
    it('upvote unespect...', () => {
        const id = 1;
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((num):any => num === id? true : false);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((num, opt):any => {});
        const promise = recommendationService.upvote(2);
        expect(promise).rejects.toEqual({ type: "not_found", message: ""});
    });
})
describe("service getRandom", () => {
    it('getRandom gt...', () => {
        const realRandom = Math.random.bind(global.Math);
        global.Math.random = () => 0.6;
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(({score, scoreFilter}):any => {
            expect(score).toEqual(10);
            expect(scoreFilter).toEqual('gt');
            return ['obj']
        });
        const promise = recommendationService.getRandom();
        promise.then(res => expect(res).toEqual('obj'));
        global.Math.random = realRandom;
    });
    it('getRandom lte...', () => {
        const realRandom = Math.random.bind(global.Math);
        global.Math.random = () => 0.8;
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(({score, scoreFilter}):any => {
            expect(score).toEqual(10);
            expect(scoreFilter).toEqual('lte');
            return [['obj', 'obj']];
        });
        const promise = recommendationService.getRandom();
        promise.then(res => expect(res).toEqual(['obj', 'obj']));
        global.Math.random = realRandom;
    });
})
describe("service get", () => {
    it('get...', () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(():any => true);
        const promise = recommendationService.get();
        promise.then(res => expect(res).toEqual(true));
    });
    it('getById...', () => {
        const id = 1;
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((num):any => num === id? true : false);
        const promise = recommendationService.getById(1);
        promise.then(res => expect(res).toEqual(true));
    });
    it('getById throw...', () => {
        const id = 1;
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((num):any => num === id? true : false);
        const promise = recommendationService.getById(2);
        expect(promise).rejects.toEqual({ type: "not_found", message: ""});
    });
    it('getTop...', () => {
        const top = 10;
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((num):any => expect(num).toEqual(top));
        recommendationService.getTop(10);        
    });
})