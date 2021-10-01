import Nexus from './Nexus';
import PublicationService from './services/PublicationService';

describe('Nexus', () => {
  it('Can instanciate Nexus', () => {
    const nexus = Nexus.getInstance();
    expect(nexus).toBeDefined();

    expect(nexus).toBeInstanceOf(Nexus);
  });

  it('Nexus can provide a service', () => {
    const nexus = Nexus.getInstance();
    const service = nexus.getPublicationService();
    expect(service).toBeInstanceOf(PublicationService);
  });
});
