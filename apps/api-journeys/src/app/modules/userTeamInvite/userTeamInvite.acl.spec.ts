import { Test, TestingModule } from '@nestjs/testing'
import { subject } from '@casl/ability'
import { UserTeamRole, UserTeamInvite } from '.prisma/api-journeys-client'
import { Action, AppAbility, AppCaslFactory } from '../../lib/casl/caslFactory'

describe('userTeamAcl', () => {
  let factory: AppCaslFactory, ability: AppAbility
  const user = { id: 'userId' }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppCaslFactory]
    }).compile()
    factory = module.get<AppCaslFactory>(AppCaslFactory)
    ability = await factory.createAbility(user)
  })
  const userTeamInviteUserTeamManager = subject('UserTeamInvite', {
    id: 'UserTeamInviteId',
    removedAt: null,
    acceptedAt: null,
    team: {
      userTeams: [{ userId: user.id, role: UserTeamRole.manager }]
    }
  } as unknown as UserTeamInvite)
  const userTeamInviteUserTeamMember = subject('UserTeamInvite', {
    id: 'UserTeamInviteId',
    removedAt: null,
    acceptedAt: null,
    team: {
      userTeams: [{ userId: user.id, role: UserTeamRole.member }]
    }
  } as unknown as UserTeamInvite)
  const userTeamInviteEmpty = subject('UserTeamInvite', {
    id: 'UserTeamInviteId',
    removedAt: null,
    acceptedAt: null
  } as unknown as UserTeamInvite)
  describe('read', () => {
    it('allow when user is team manager', () => {
      expect(ability.can(Action.Read, userTeamInviteUserTeamManager)).toEqual(
        true
      )
    })
    it('allow when user is team member', () => {
      expect(ability.can(Action.Read, userTeamInviteUserTeamMember)).toEqual(
        true
      )
    })
    it('deny when user has no userTeam', () => {
      expect(ability.can(Action.Read, userTeamInviteEmpty)).toEqual(false)
    })
    describe('removedAt', () => {
      it('deny when user is team manager', () => {
        expect(
          ability.can(Action.Read, {
            ...userTeamInviteUserTeamManager,
            removedAt: new Date()
          })
        ).toEqual(false)
      })
      it('deny when user is team member', () => {
        expect(
          ability.can(Action.Read, {
            ...userTeamInviteUserTeamMember,
            removedAt: new Date()
          })
        ).toEqual(false)
      })
      it('deny when user has no userTeam', () => {
        expect(
          ability.can(Action.Read, {
            ...userTeamInviteEmpty,
            removedAt: new Date()
          })
        ).toEqual(false)
      })
    })
    describe('acceptedAt', () => {
      it('deny when user is team manager', () => {
        expect(
          ability.can(Action.Read, {
            ...userTeamInviteUserTeamManager,
            acceptedAt: new Date()
          })
        ).toEqual(false)
      })
      it('deny when user is team member', () => {
        expect(
          ability.can(Action.Read, {
            ...userTeamInviteUserTeamMember,
            acceptedAt: new Date()
          })
        ).toEqual(false)
      })
      it('deny when user has no userTeam', () => {
        expect(
          ability.can(Action.Read, {
            ...userTeamInviteEmpty,
            acceptedAt: new Date()
          })
        ).toEqual(false)
      })
    })
  })
  describe('manage', () => {
    it('allow when user is team manager', () => {
      expect(ability.can(Action.Manage, userTeamInviteUserTeamManager)).toEqual(
        true
      )
    })
    it('deny when user is team member', () => {
      expect(ability.can(Action.Manage, userTeamInviteUserTeamMember)).toEqual(
        false
      )
    })
    it('deny when user has no userTeam', () => {
      expect(ability.can(Action.Manage, userTeamInviteEmpty)).toEqual(false)
    })
    describe('removedAt', () => {
      it('deny when user is team manager', () => {
        expect(
          ability.can(Action.Manage, {
            ...userTeamInviteUserTeamManager,
            removedAt: new Date()
          })
        ).toEqual(false)
      })
      it('deny when user is team member', () => {
        expect(
          ability.can(Action.Manage, {
            ...userTeamInviteUserTeamMember,
            removedAt: new Date()
          })
        ).toEqual(false)
      })
      it('deny when user has no userTeam', () => {
        expect(
          ability.can(Action.Manage, {
            ...userTeamInviteEmpty,
            removedAt: new Date()
          })
        ).toEqual(false)
      })
    })
    describe('acceptedAt', () => {
      it('deny when user is team manager', () => {
        expect(
          ability.can(Action.Manage, {
            ...userTeamInviteUserTeamManager,
            acceptedAt: new Date()
          })
        ).toEqual(false)
      })
      it('deny when user is team member', () => {
        expect(
          ability.can(Action.Manage, {
            ...userTeamInviteUserTeamMember,
            acceptedAt: new Date()
          })
        ).toEqual(false)
      })
      it('deny when user has no userTeam', () => {
        expect(
          ability.can(Action.Manage, {
            ...userTeamInviteEmpty,
            acceptedAt: new Date()
          })
        ).toEqual(false)
      })
    })
  })
})
