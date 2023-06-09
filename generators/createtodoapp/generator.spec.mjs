import { expect } from 'esmocha';

import { helpers, lookups } from '#test-utils';

const SUB_GENERATOR = 'createtodoapp';
const SUB_GENERATOR_NAMESPACE = `jhipster-azure-spring-apps:${SUB_GENERATOR}`;

describe('SubGenerator createtodoapp of azure-spring-apps JHipster blueprint', () => {
  describe('run', () => {
    let result;
    before(async function () {
      result = await helpers
        .create(SUB_GENERATOR_NAMESPACE)
        .withOptions({
          reproducible: true,
          blueprint: 'azure-spring-apps',
          appDir: false,
          // baseName: 'jhipster-azure-spring-apps',
          ignoreNeedlesError: true,
        })
        .withLookups(lookups)
        .run();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });
  });
});
